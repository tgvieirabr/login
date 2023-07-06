import React, { useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const SelectClient = () => {

    const { data, loading, error } = useFetch();

    if (error) return <Error error={error} />;
    if (loading) return <Loading />;
    if (data)
    return (
        <div>
            <div>Clientes:</div>
            <select>
                <option value="" defaultValue>
                    Selecione uma opção
                </option>
            </select>
        </div>
    )
};

export default SelectClient;