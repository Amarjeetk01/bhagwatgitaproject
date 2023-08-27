
import React from "react";
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const  PrevHandler= ({ disabled, onClick }) => (
  <IconButton disabled={disabled} onClick={onClick}>
    <ArrowLeftIcon />
  </IconButton>
);

const NextHandler = ({ disabled, onClick }) => (
  <IconButton disabled={disabled} onClick={onClick}>
    <ArrowRightIcon />
  </IconButton>
);

export  {NextHandler, PrevHandler};
