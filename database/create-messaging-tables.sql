-- ============================================
-- SISTEMA DE MENSAJERÍA SCRIPT9
-- Tablas para comunicación entre anfitriones y huéspedes
-- ============================================

-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES users(id) ON DELETE CASCADE,
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_preview TEXT,
  guest_unread_count INT DEFAULT 0,
  host_unread_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimizar queries
CREATE INDEX IF NOT EXISTS idx_conversations_guest ON conversations(guest_id);
CREATE INDEX IF NOT EXISTS idx_conversations_host ON conversations(host_id);
CREATE INDEX IF NOT EXISTS idx_conversations_booking ON conversations(booking_id);
CREATE INDEX IF NOT EXISTS idx_conversations_property ON conversations(property_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON conversations(last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read) WHERE is_read = false;

-- Función para actualizar last_message_at automáticamente
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    last_message_at = NEW.created_at,
    last_message_preview = LEFT(NEW.message_text, 100),
    updated_at = NOW(),
    -- Incrementar contador de no leídos según quién sea el receptor
    guest_unread_count = CASE 
      WHEN NEW.sender_id = (SELECT host_id FROM conversations WHERE id = NEW.conversation_id)
      THEN guest_unread_count + 1
      ELSE guest_unread_count
    END,
    host_unread_count = CASE 
      WHEN NEW.sender_id = (SELECT guest_id FROM conversations WHERE id = NEW.conversation_id)
      THEN host_unread_count + 1
      ELSE host_unread_count
    END
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar conversación cuando se crea un mensaje
DROP TRIGGER IF EXISTS trigger_update_conversation_on_message ON messages;
CREATE TRIGGER trigger_update_conversation_on_message
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_conversation_last_message();

-- Función para resetear contador de no leídos
CREATE OR REPLACE FUNCTION reset_unread_count(
  p_conversation_id UUID,
  p_user_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_guest_id UUID;
  v_host_id UUID;
BEGIN
  -- Obtener IDs de la conversación
  SELECT guest_id, host_id INTO v_guest_id, v_host_id
  FROM conversations
  WHERE id = p_conversation_id;

  -- Resetear contador según el usuario
  IF p_user_id = v_guest_id THEN
    UPDATE conversations
    SET guest_unread_count = 0
    WHERE id = p_conversation_id;
  ELSIF p_user_id = v_host_id THEN
    UPDATE conversations
    SET host_unread_count = 0
    WHERE id = p_conversation_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Habilitar RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies para conversations
-- Los usuarios pueden ver sus propias conversaciones (como guest o host)
CREATE POLICY "Users can view their own conversations"
ON conversations FOR SELECT
USING (
  auth.uid() = guest_id OR 
  auth.uid() = host_id
);

-- Los usuarios pueden crear conversaciones donde sean guest o host
CREATE POLICY "Users can create conversations"
ON conversations FOR INSERT
WITH CHECK (
  auth.uid() = guest_id OR 
  auth.uid() = host_id
);

-- Los usuarios pueden actualizar sus propias conversaciones
CREATE POLICY "Users can update their own conversations"
ON conversations FOR UPDATE
USING (
  auth.uid() = guest_id OR 
  auth.uid() = host_id
);

-- Policies para messages
-- Los usuarios pueden ver mensajes de sus conversaciones
CREATE POLICY "Users can view messages from their conversations"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.guest_id = auth.uid() OR conversations.host_id = auth.uid())
  )
);

-- Los usuarios pueden crear mensajes en sus conversaciones
CREATE POLICY "Users can create messages in their conversations"
ON messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.guest_id = auth.uid() OR conversations.host_id = auth.uid())
  )
  AND sender_id = auth.uid()
);

-- Los usuarios pueden actualizar (marcar como leído) mensajes de sus conversaciones
CREATE POLICY "Users can update messages in their conversations"
ON messages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.guest_id = auth.uid() OR conversations.host_id = auth.uid())
  )
);

-- Comentarios para documentación
COMMENT ON TABLE conversations IS 'Almacena las conversaciones entre huéspedes y anfitriones';
COMMENT ON TABLE messages IS 'Almacena los mensajes individuales de cada conversación';
COMMENT ON COLUMN conversations.guest_unread_count IS 'Número de mensajes no leídos por el huésped';
COMMENT ON COLUMN conversations.host_unread_count IS 'Número de mensajes no leídos por el anfitrión';
COMMENT ON COLUMN conversations.last_message_preview IS 'Preview de los primeros 100 caracteres del último mensaje';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Para ejecutar este script:
-- 1. Ve al Editor SQL de Supabase
-- 2. Copia y pega todo este contenido
-- 3. Ejecuta el script
-- 4. Verifica que las tablas se hayan creado correctamente


