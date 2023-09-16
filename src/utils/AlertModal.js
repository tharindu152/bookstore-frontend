import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const AlertModal = (props) => {
  return (
    <div>
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={props.cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {props.alertHeading}
            </AlertDialogHeader>

            <AlertDialogBody>{props.alertMsg}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={props.cancelRef} onClick={props.onClose}>
                {props.btnNo}
              </Button>
              <Button
                colorScheme='red'
                onClick={(e) => {
                  props.onClose();
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('username');
                  sessionStorage.removeItem('user_id');
                  localStorage.removeItem('cartItems');
                  localStorage.removeItem('finalCartStats');
                  window.location.href = '/login';
                }}
                ml={3}
              >
                {props.btnYes}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default AlertModal;
