import React from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.css';
import { thunkGetSingleUser } from '../../store/session';

function ProfilePage() {

    const currUser = useSelector((state) => state.session?.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    console.log("CURRENT USERID:", userId)


    useEffect(() => {
        dispatch(thunkGetSingleUser(userId));
    }, [dispatch, userId]);

    const user = useSelector((state) => state.session?.singleUser)
    console.log("CURRENT USER:", user)


  return (
    <>
        <div className='PP-Main-Div'>

            <div className='PP-User-Info-Div'>
                <div className='PP-User-Images'>
                    <img className='PP-User-HeaderImage' src={user?.headerImage}></img>
                    <img className='PP-User-ProfileImage' src={user?.profileImage}></img>
                </div>
                <div className='PP-User-Info'>
                    <h3 className='PP-User-Name'>{user?.firstname} {user?.lastname}</h3>
                    <p className='PP-User-Occupation'>{user?.occupation}</p>
                    <p className='PP-User-Location'>{user?.location}</p>
                </div>
            </div>

            <div className='PP-User-About-Div'>
                <h3 className='PP-User-About-Title'>About</h3>
                <i class="fa-solid fa-pen fa-lg PP-About-Edit-Icon"></i>
                <p className='PP-User-About-Text'>{user?.about}</p>
            </div>

        </div>

        <div className='PP-SideCard-Div'>
        </div>
    </>
  );
}

export default ProfilePage;