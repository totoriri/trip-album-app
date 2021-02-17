import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DefaultImg from '../assets/img/candy.jpg';
import { makeStyles } from '@material-ui/core/styles';
import UserImgForm from '../components/forms/UserImgForm';

const useStyles = makeStyles((theme) => ({
  userImg: {
    width: '200px',
    height: 'auto',
    marginTop: '100px ',
  },
}));

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const classes = useStyles();

  return (
    <>
      <div>
        <img src={DefaultImg} className={classes.userImg} />
      </div>
      <UserImgForm currentUser={currentUser} />
    </>
  );
};

export default Profile;
