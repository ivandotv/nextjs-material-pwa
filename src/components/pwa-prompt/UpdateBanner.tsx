import PwaNotification from './PwaNotification'

export function UpdateBanner({
  onCancel,
  onOk,
  show
}: {
  onCancel: () => void
  onOk: () => void
  show: boolean
}) {
  return (
    <PwaNotification
      onCancel={onCancel}
      onOk={onOk}
      show={show}
      title="New Version Available"
      okText="Reload"
    >
      <p>New version of the application is available. Reload to update.</p>
    </PwaNotification>
  )
}
