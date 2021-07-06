import { useRootStore } from 'components/providers/RootStoreProvider'
import { t } from '@lingui/macro'
import { observer } from 'mobx-react-lite'
import PwaNotification from './PwaNotification'

const UpdateBanner = observer(function UpdateBanner() {
  const { serviceWorker } = useRootStore()
  // const classes = useStyles()

  return (
    <PwaNotification
      // className={classes.notif}
      onCancel={serviceWorker.hideUpdatePrompt}
      onOk={serviceWorker.update}
      show={serviceWorker.showUpdatePrompt}
      title={t`New Version Available`}
      okText={t`Reload`}
    >
      <p>
        {t`New version of the application is available. Reload to update.`}{' '}
      </p>
    </PwaNotification>
  )
})

export default UpdateBanner
