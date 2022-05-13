import React, { useState, useEffect } from 'react'
import classes from './Nameday.module.css'
//import classes from './Conditions.module.css'



const Nameday = () => {
    const [resName, setResName] = useState('')
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')

    const getName = () => {
        fetch('https://nameday.abalin.net/api/V1/today')
            .then(response => response.json())
            .then(response => {
                setResName(response.nameday.hu);
            })
    };

    useEffect(() => {
        getName()
    },
        []
    )

    const getQuotes = () => {
        const apiKey = "bde3a9e06dfa1c4f58852116f7756b4d03c8db6c"
        fetch(`https://zenquotes.io/api/quotes/${apiKey}/`)
            .then(response => response.json())
            .then(response => {
                setQuote(response[0].q);
                setAuthor(response[0].a);
            })
    };


    useEffect(() => {
        getQuotes()
    },
        []
    )

    const day = new Date();

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    const today = day.toLocaleString("en-GB", options);


    return (
        <div className={classes.Extra_hot}>
            <h2 className={classes.Time}>{today}</h2>

            {resName &&
                <>
                    <h3 className={classes.Row}>Namedays in Hungary today:</h3>
                    <p className={classes.Response}>{resName}</p>
                </>}

            {quote &&
                <>
                    <h3 className={classes.Row}>Your takeaway for today:</h3>
                   <p className={classes.Text}><span>"{quote}"</span> - {author}</p> 
                </>}
        </div>
    );
}
export default Nameday;