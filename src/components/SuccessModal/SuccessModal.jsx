import * as React from 'react'
import { Transition } from 'react-transition-group'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'

export default function FadeModalDialog({ open, handleOpen, modalBody }) {
  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={handleOpen}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === 'exited' ? 'hidden' : 'visible',
            }}
          >
            <ModalDialog
              color='success'
              size='sm'
              variant='soft'
              aria-labelledby='fade-modal-dialog-title'
              aria-describedby='fade-modal-dialog-description'
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <Typography id='fade-modal-dialog-title' component='h2'>
                Success!!
              </Typography>
              <Typography
                id='fade-modal-dialog-description'
                textColor='text.tertiary'
              >
                {modalBody}
              </Typography>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  )
}
