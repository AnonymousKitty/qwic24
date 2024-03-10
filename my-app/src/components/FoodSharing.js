import React from 'react';
import './WelcomePage.css'; // Import the CSS for styling
import Header from './Header';
import SideNav from './SideNav';

import { useState } from 'react';

import axios from 'axios';



const FoodSharing = () => {
    const [location, setLocation] = useState('');

    const handleLocationClick = () => {
        navigator.geolocation.getCurrentPosition(
            async(position) => {
                try{
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBBC4YowgOpQfmb7qM4ZI3EpKZuo8FXRsc`);
                    const { results } = response.data;
                    if (results && results.length > 0) {
                        setLocation(results[0].formatted_address);
                    } else {
                        setLocation('Address not found');
                }
            } catch (error){
                console.error('Error geocoding address: ',error);
                setLocation('Error getting address')
            }
        },
        (error) => {
            console.error('Error getting location: ', error);
            setLocation('Location not available');
            }
        );
    };

    return (
        
        <div className='flex w-[100vw] flex-row'>
            @babel/plugin-proposal-private-property-in-object
            <SideNav />
            <div className=' w-[100vw]'>

                <Header />

                <div className="Food Sharing">
                
                <Header>
                    
                </Header>
                    <div className='welcome-box'>
                        <div className="welcome-info">
                            <h2 className="h2-title">Share Food</h2>
                            <p className='intro-sentence'>Here is where you can share your meal</p>
                            <div>
                                <button onClick = {handleLocationClick} 
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                }}> 
                                Click Here So We Can Get Our Location 
                                </button>
                                <p>{location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default FoodSharing;