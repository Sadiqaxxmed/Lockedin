import React from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css';

function ProfilePage() {
    const currUser = useSelector((state) => state.session?.user);

  return (
    <>
        <div className='PP-Main-Div'>

            <div className='PP-User-Info-Div'>
                <div className='PP-User-Images'>
                    <img className='PP-User-HeaderImage' src={currUser?.headerImage}></img>
                    <img className='PP-User-ProfileImage' src={currUser?.profileImage}></img>
                </div>
                <div className='PP-User-Info'>
                    <h3 className='PP-User-Name'>{currUser?.firstname} {currUser?.lastname}</h3>
                    <p className='PP-User-Occupation'>{currUser?.occupation}</p>
                    <p className='PP-User-Location'>{currUser?.location}</p>
                </div>
            </div>

            <div className='PP-User-About-Div'>
                <h3 className='PP-User-About-Title'>About</h3>
                <i class="fa-solid fa-pen fa-lg PP-About-Edit-Icon"></i>
                <p className='PP-User-About-Text'>{currUser?.about}</p>
            </div>

        </div>

        <div className='PP-SideCard-Div'>
        </div>
    </>
  );
}

export default ProfilePage;