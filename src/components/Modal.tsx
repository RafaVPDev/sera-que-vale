import { AlertTriangle } from 'lucide-react'

interface ModalProps {
  mensagem: string
  onConfirmar: () => void
  onCancelar: () => void
}

function Modal({ mensagem, onConfirmar, onCancelar }: ModalProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        border: '2px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center'
      }}>
        <AlertTriangle size={40} color='var(--border-color)' />
        <p style={{
          color: 'var(--text-color)',
          fontSize: '16px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          {mensagem}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onCancelar}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: '2px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-color)',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent-color)',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal