import React from 'react';
import classes from './Conditions.module.css'
import Pictures from './pictures'



const conditions = (props) => {
    
    return (
        <div className = {classes.Wrapper}>
            {props.error && <p className={classes.NotFound}>Please enter a valid city.</p>}
            {props.loading && 
            <div className={classes.SpinnerContainer}>
                <div className={classes.LoadingSpinner}>
                </div>
            </div>}


            {props.responseObj.cod === 200 ?
                <div className={classes.CardCont}>
                    <img className={classes.Background} src={require('./img/' + props.responseObj.weather[0].main + '.png')} alt={Pictures.title} />
                    <button className={classes.ToggleFav} onClick={props.favFunc}>Toggle Favourite</button> 
                    <div className={classes.DataCont}>
                        <p className={classes.Temp}>{Math.round(props.responseObj.main.temp)}°</p>
                        <p className={classes.Desc}>{props.responseObj.weather[0].main}</p>
                        <img src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}.png`} alt={`${props.responseObj.weather[0].description}`} />
                        <p className={classes.City}>{props.responseObj.name}</p>
                        <p className={classes.City}>{props.responseObj.sys.country}</p>
                    </div>
                    <div className={classes.ExtraCont}>
                        <div className={classes.Feelslike}>
                            <img src={require('./img2/good-review.png')} alt='Feels like icon'/>
                            <h3 className="temp">Feels like</h3>                            
                            <h2 className="temp">{Math.round(props.responseObj.main.feels_like)}°</h2>
                        </div>
                        <div className={classes.Humidity}>
                            <img src={require('./img2/humidity.png')} alt='Humidity icon'/>
                            <h4 className="temp">Humidity</h4>
                            <h2 className="temp">{props.responseObj.main.humidity} %</h2>
                        </div>
                        <div className={classes.Wind}>
                            <img src={require('./img2/wind.png')} alt='Wind icon'/>
                            <h3 className="temp">Wind</h3>                            
                            <h2 className="temp">{props.responseObj.wind.speed} km/h</h2>
                        </div>
                    </div>
                </div>
            : null
            }
        </div>
    )
}
export default conditions;

