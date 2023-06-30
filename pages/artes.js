import React, { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';
import { BiSearchAlt, BiPlus } from "react-icons/bi";
import { BsArrowDownUp, BsFillCarFrontFill } from "react-icons/bs"


const apiURL = 'https://api.midiacarros.com.br/arts';
const authToken = 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3OTg1MDU1LCJleHAiOjE2ODg1ODk4NTV9.pOVZvMolSaacqn8XyPuAqASmt2YwpQ9KlAiLwbjzBq4';

function Card({ title, thumb, user_name }) {
    return (
        <div className='card'>
            <div className='boximage'>
                <img src={thumb} alt={title} />
            </div>
            <h2 className='title'>{title}</h2>
            <div className='client-name'>{user_name}</div>
        </div>
    );
}

function IndexPage() {
    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsPerPage, setResultsPerPage] = useState(50);

    useEffect(() => {
        fetchCards();
    }, []);

    useEffect(() => {
        setCards([]);
        setCurrentPage(1);
        fetchCards();
    }, [resultsPerPage]);

    const fetchCards = () => {
        setLoading(true);

        fetch(`${apiURL}?limit=${resultsPerPage}&page=${currentPage}`, {
            headers: {
                Authorization: authToken
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.result.list && Array.isArray(data.result.list)) {
                    const newCards = currentPage === 1 ? data.result.list : [...cards, ...data.result.list];
                    setCards(newCards);
                    setOriginalCards(newCards);
                } else {
                    console.error('Não foi possível encontrar a lista de dados na resposta da API:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
                setLoading(false);
            });
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredCards = originalCards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setCards(filteredCards);
    };

    const handleResultsPerPageChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setResultsPerPage(selectedValue);
    };

    const filteredCards = cards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <div id='logo'>
                <img src='/images/logo.svg'/>
            </div>
            <header>
                <div className='box-ordenar'>
                    <BsArrowDownUp className='flechas' />
                    <div className='ordenar'>
                        Ordenar:
                    </div>
                    <select id='opcoes-ordenar'>
                        <option value="" defaultValue>Selecione uma opção</option>
                        <option>Nome do cliente</option>
                        <option>ID</option>
                        <option>Data de criação</option>
                    </select>
                </div>
                <div className='box-exibir'>
                    <div className='exibir'>
                        Exibir:
                    </div>
                    <select id='numeroresultados' value={resultsPerPage} onChange={handleResultsPerPageChange}>
                        <option value="50" defaultValue>50 por página</option>
                        <option value="100">100 por página</option>
                        <option value="150">150 por página</option>
                        <option value="200">200 por página</option>
                        <option value="250">250 por página</option>
                    </select>
                </div>

                <div id='search-input'>
                    <BiSearchAlt className='lupa' />
                    <input type="text" placeholder='Pesquisar' value={searchTerm} onChange={handleSearch}></input>
                </div>

                <button className='addbutton'>
                    <BiPlus className='buttonmore' />
                </button>

            </header>
            <div className="card-list">
                {loading ? (
                    <p>Carregando</p>
                ) : (
                    filteredCards.map(card => (
                        <Card key={card.id} title={card.title} thumb={card.thumb} user_name={card.user_name} />
                    ))
                )}
            </div>
        </Layout>
    );
}

export default IndexPage;
