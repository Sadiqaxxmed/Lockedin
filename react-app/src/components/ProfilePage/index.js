import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.css';
import { thunkGetSingleUser, thunkUpdateAbout } from '../../store/session';

import OpenModalButton from "../OpenModalButton";

import UpdateAbout from './UpdateAbout';
import DeleteAbout from './DeleteAbout';
import CreateAbout from './CreateAbout';

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
                {currentUser?.id === user?.id && user?.about !== null && (  
                    <i class="fa-solid fa-ellipsis PP-About-Edit-Icon"
                    onClick={handleMenu}
                    ></i>
                )}
                {currentUser?.id === user?.id && user?.about == null && (  
                    <div className='PP-Add-About'>
                        <OpenModalButton
                            className="PP-Add-About-Button" 
                            buttonText="Add About"
                            onButtonClick={""}
                            modalComponent={
                                <CreateAbout
                                    user={user}
                                />
                            }
                        />
                    </div>
                )}
                <div className='PP-About-Menu'>
                    {menuOpen && (
                    <div className='PP-About-Menu-Open'>
                        <div className='PP-About-Edit-Menu-Div'> 
                        <i class="fa-regular fa-pen-to-square PP-About-Icons"></i>
                            <OpenModalButton
                                className="PP-About-Edit"
                                buttonText="Edit"
                                onButtonClick={handleMenu}
                                modalComponent={
                                <UpdateAbout
                                    user={user}
                                />
                                }
                            />
                            </div>
                            <div className='PP-About-Delete-Menu-Div'>
                            <i class="fa-solid fa-trash-can PP-About-Icons"></i>
                            <OpenModalButton
                                className="PP-About-Edit"
                                buttonText="Delete"
                                onButtonClick={handleMenu}
                                modalComponent={
                                    <DeleteAbout user={user} />
                                }
                            />
                            </div>
                        </div>
                    )}
                </div>
                <p className='PP-User-About-Text'>{user?.about}</p>
            </div>
        </div>

        <div className='PP-SideCard-Div'>
            <h3 className='PP-SideCard-Title'>People also viewed</h3>
            <div className='PP-SideCard-User-Div'>
                <img className='PP-SideCard-User-Image' src='data:image/jpeg;base64,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'></img>
                <div className='PP-SideCard-User-Info'>
                    <h3 className='PP-SideCard-User-Name'>Mark Andrew</h3>
                    <p className='PP-SideCard-User-Location'>San Francisco, CA</p>    
                </div>
            </div>
            <div class="PP-SideCard-Hr"></div>

            <div className='PP-SideCard-User-Div-Two'>
                <img className='PP-SideCard-User-Image-Two' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRePC5DQ3wsGnq9qpAc3qKfa0IbopjbxIDGg&usqp=CAU'></img>
                <div className='PP-SideCard-User-Info-Two'>
                    <h3 className='PP-SideCard-User-Name-Two'>Jane Manny</h3>
                    <p className='PP-SideCard-User-Location-Two'>Seattle, WA</p>    
                </div>
            </div>
            <div class="PP-SideCard-Hr-Two"></div>

            <div className='PP-SideCard-User-Div-Three'>
                <img className='PP-SideCard-User-Image-Three' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6q4zgGk2VWY4WTuPmRUqzDeYcl80LZeDW7w&usqp=CAU'></img>
                <div className='PP-SideCard-User-Info-Three'>
                    <h3 className='PP-SideCard-User-Name-Three'>Saad Anwar</h3>
                    <p className='PP-SideCard-User-Location-Three'>Los Angeles, CA</p>    
                </div>
            </div>
            <div className='PP-SideCard-ShowMore'>
            <div class="PP-SideCard-Hr-Three"></div>
            <h3 className='PP-SideCard-ShowMore-Text'>Show More </h3>
            <i class="fa-solid fa-chevron-down fa-2xs PP-SideCard-ShowMore-Icon"></i>
            </div>
        </div>
    </>
  );
}

export default ProfilePage;