import React from 'react';
import './account-settings.scss';

function AccountSettings(){
    return (
        <div className='accountsettings-container'>
            <p className='page-title'>Account</p>
            <hr/>

            <div className='main-container'>
                <div className='profile-picture-container'>
                    Profile Picture
                </div>

                <div className='information-container'>
                    Personal Information
                    Address Information
                </div>

                <div className='your-data-container'>
                    Your Data
                </div>

                <div className='account-deletion-container'>
                    Account Deletion
                </div>
            </div>

            

        </div>
    );
}

export default AccountSettings