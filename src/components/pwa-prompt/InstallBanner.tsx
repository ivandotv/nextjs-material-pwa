import PwaNotification from './PwaNotification'

export function InstallBanner({
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
      title="Install"
      okText="Install"
    >
      <p>
        Installing Material App uses almost no storage and provides a quick way
        to launch it from the home screen.
      </p>
    </PwaNotification>
  )
}
