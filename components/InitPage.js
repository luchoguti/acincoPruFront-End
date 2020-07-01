import { Fragment } from 'react';
import Head from 'next/head';

const InitPage = (props) => {
    return  (
            <Fragment>
                <Head>
                    <title>Front-End Prueba Acinco</title>
                </Head>
                <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/solar/bootstrap.min.css" rel="stylesheet" integrity="sha384-iDw+DjLp94cdk+ODAgTY4IZ6d9aaRpG9KHr168TPxrfQ9wv/DTVC+cWyojoxjHBT" crossOrigin="anonymous"/>
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
                <link rel="stylesheet" href="https://unpkg.com/bs-stepper/dist/css/bs-stepper.min.css"/>
                <script src="https://unpkg.com/bs-stepper/dist/js/bs-stepper.min.js"></script>
                <div className="container p-4">
                    {props.children}
                </div>
            </Fragment>);
}

export default InitPage;