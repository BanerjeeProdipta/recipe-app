import React from 'react';
import Fade from '@material-ui/core/Fade/Fade';
import Modal from '@material-ui/core/Modal/Modal';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import Icon from '../icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    },
  }),
);

interface props {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
  title: string;
}

export const CustomModal: React.FC<props> = ({ open, onClose, children, title }) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableEnforceFocus
    >
      <Fade in={open}>
        <div className="bg-white rounded-lg border focus:outline-none">
          <div className="w-auto">
            <div className="flex justify-between items-center px-6 py-4">
              <p className="font-semibold text-xl pr-4">{title}</p>
              <div
                className="cursor-pointer bg-white border border-gray-100 inline-block p-2.5 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                onClick={onClose}
              >
                <Icon name="cross" className="h-4 fill-current text-black stroke-current stroke-1" />
              </div>
            </div>
            <div className="overflow-auto px-6 pb-6" style={{ maxHeight: '70vh' }}>
              {children}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
