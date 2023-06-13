import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.css';
import { thunkGetSingleUser, thunkUpdateAbout } from '../../store/session';

import OpenModalButton from "../OpenModalButton";

import UpdateAbout from './UpdateAbout';
import DeleteAbout from './DeleteAbout';

function ProfilePage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const [menuOpen, setMenuOpen] = useState(false);

    const currentUser = useSelector((state) => state.session?.user)
    const user = useSelector((state) => state.session?.singleUser)

  function handleMenu() {
    if (!menuOpen) {
        setMenuOpen(true);
    } else {
        setMenuOpen(false);
    }
  }

    useEffect(() => {
        dispatch(thunkGetSingleUser(userId));
    }, [dispatch, userId]);


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

                {currentUser?.id === user?.id && (  
                    <i class="fa-solid fa-pen fa-lg PP-About-Edit-Icon"
                    onClick={handleMenu}
                    ></i>
                )}
                <div className='PP-About-Menu'>
                    {menuOpen && (
                        <div className='PP-About-Menu-Open'>
                            <div className='PP-About-Edit-Menu-Div'> 
                                <OpenModalButton
                                  className="FD-Comment-Update"
                                  buttonText="Edit"
                                  onButtonClick={""}
                                  modalComponent={
                                    <UpdateAbout
                                        user={currentUser}
                                    />
                                  }
                                />
                            </div>

                            <div className='PP-About-Delete-Menu-Div'>
                            <OpenModalButton
                                  className="FD-Comment-Delete"
                                  buttonText="Delete"
                                  onButtonClick={""}
                                  modalComponent={
                                    <DeleteAbout user={currentUser} />
                                  }
                                />
                                {/* <p className='PP-About-Delete-Menu-Text'>Delete</p> */}
                            </div>
                        </div>
                    )}
                </div>

                <p className='PP-User-About-Text'>{user?.about}</p>
            </div>

        </div>

        <div className='PP-SideCard-Div'>
        </div>
    </>
  );
}

export default ProfilePage;