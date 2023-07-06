import React from 'react';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const Searchbar = ({ }) => {

    const { data, loading, error } = useFetch();

    if (error) return <Error error={error} />;
    if (loading) return <Loading />;
    if (data)
    return (
        <div>
            <input
                type='text'
                placeholder='Pesquisar'
            ></input>
        </div>
    );
};

export default Searchbar;