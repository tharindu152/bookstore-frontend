import React from 'react';
import { useEffect, useState } from 'react';
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
              Book already added
            </AlertDialogHeader>

            <AlertDialogBody>
              Selected Book is alreday available in the cart!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={props.cancelRef}
                // onClick={(e) => {
                //   props.onClose();
                // }}
              >
                Close
              </Button>
              {/* <Button
                colorScheme='red'
                onClick={(e) => {
                  props.onClose();
                  window.location.href = '/cart';
                }}
                ml={3}
              >
                View Cart
              </Button> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default AlertModal;
