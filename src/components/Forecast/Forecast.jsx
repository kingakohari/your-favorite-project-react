import React, { useState, useEffect } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';
import cityList from './city-list.json';
import Nameday from '../Conditions/Nameday';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Forecast = () => {

    let [city, setCity] = useState('');
    /* let [unit, setUnit] = useState('metric'); */
    let unit = ["metric", "imperial"]
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [responseObj, setResponseObj] = useState({});
    let [autocompleteList, setAutocomplete] = useState([]);
    let [favouriteList, setFavourite] = useState(JSON.parse(localStorage.getItem('fav-list')) || []);
   

    const getForecast = (e) => {
        e.preventDefault();

        setError(false);
        setResponseObj({});
        setLoading(true);
        setAutocomplete([]);


        let uriEncodedCity = encodeURIComponent(city);
        let apiKey = '04d938b7d796575d505e196f0b141d37';
        
        setTimeout(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&lang=hu&appid=${apiKey}&units=${unit[0]}`)
                .then(response => response.json())
                .then(response => {
                    if (response.cod !== 200) {
                        throw new Error();
                    }
                    setResponseObj(response);
                    setLoading(false);
                })
                .catch(err => {
                    setError(true);
                    setLoading(false);
                    console.log(err.message);
                });
        }, 2000);
    };

    const autocompleteComponent = (city, i, inputValue) => {
        return (
            <div
                key={i}
                className={classes.AutocompleteList}
                onClick={selectCityFromAutocomplete}>
                <b>{city.name.substr(0, inputValue.length)}</b>{city.name.substr(inputValue.length)}
            </div>
        );
    };

    const favouriteComponent = (city, i) => {
        return (
            <div
                key={i}
                className={classes.AutocompleteList}
                onClick={selectCityFromAutocomplete}>
                <b>{city.substr(0, 1).toUpperCase()}{city.substr(1, city.length).toLowerCase()}</b>
            </div>
        );
    };

    const getAutocomplete = (e) => {
        const inputValue = e.target.value;
        setCity(inputValue);

        if (inputValue.length >= 3) {

            let cities = cityList.filter(iteratedCity =>
                iteratedCity.name.substr(0, inputValue.length).toUpperCase().includes(inputValue.toUpperCase())).slice(0, 5);

            if (cities.length === 0) {
                cities = cityList.filter(iteratedCity => iteratedCity.name.includes(inputValue));
            }
            setAutocomplete(cities.map((city, i) => autocompleteComponent(city, i, inputValue)));

        } else {
            setAutocomplete([]);
        }
    };

    const getFavourites = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length === 0) {
            setAutocomplete(favouriteList.map((city, i) => favouriteComponent(city, i)));
        }
    };

    const toggleFavourites = (e) => {
        const listCopy = [...favouriteList];
        const reqName = responseObj.name.toUpperCase();

        if (listCopy.indexOf(reqName) === -1) {
            console.log('Added to favourites');
            e.target.style.background = "linear-gradient(135deg, #f34079 40%, #fc894d)";
            setFavourite([...listCopy, reqName]);

        } else {
            const indexOfCity = listCopy.indexOf(reqName);
            listCopy.splice(indexOfCity, 1);
            console.log('Removed from favourites');
            e.target.style.background = "transparent";
            setFavourite(listCopy);
        }
    };

    useEffect(() => {
        localStorage.setItem('fav-list', JSON.stringify(favouriteList));
    }, [favouriteList]);

    const selectCityFromAutocomplete = (e) => {
        const selectedCity = e.target.innerText;
        setCity(selectedCity);
        setAutocomplete([]);
    };


    return (

        <div id="content" className={classes.ContentCont}> 
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type='text'
                    placeholder='Enter City'
                    maxLength="50"
                    className={classes.Field}
                    value={city}
                    onChange={getAutocomplete}
                    onFocus={getFavourites}
                />
                <div>{autocompleteList}</div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={unit[0]}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value={unit[0]} /* onChange = {(e) => setUnit(e.target.value)} */ control={<Radio />} label="Celsius" />
                        <FormControlLabel value={unit[1]} /* onChange = {(e) => setUnit(e.target.value)} */ control={<Radio />} label="Fahrenheit" />
                        
                    </RadioGroup>
                </FormControl>
                <button className={classes.Button} type='submit' disable='loading'>Show Weather</button>
            </form>
            <Conditions
                responseObj={responseObj}
                error={error}
                loading={loading}
                favFunc={toggleFavourites} />

            <Nameday />

        </div>
    )
}
export default Forecast