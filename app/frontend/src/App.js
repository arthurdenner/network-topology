import React, { Component, Fragment } from 'react';
import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import axios from 'axios';
import './App.css';

const API_URL = 'http://165.227.178.221/api/dictionary';

class App extends Component {
  state = {
    description: '',
    error: null,
    isFetching: true,
    isSaving: false,
    meaning: '',
    words: [],
  };

  componentDidMount() {
    this.getWords();
  }

  getWords = async () => {
    const { data: words } = await axios.get(API_URL);

    this.setState({
      isFetching: false,
      words,
    });

    return words;
  };

  handleChangeText = evt => {
    const { id, value } = evt.target;

    this.setState({
      [id]: value,
    });
  };

  handleSaveButton = () => {
    const { _id, meaning, description } = this.state;

    if (!meaning || !description) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });

      this.saveWord({ _id, meaning, description });
    }
  };

  handleEdit = evt => {
    const { id } = evt.target;
    const { words } = this.state;

    const selectedWord = words.find(w => w._id === id);

    this.setState(selectedWord);

    this.input.focus();
  };

  handleCancel = () => {
    this.setState({
      _id: null,
      description: '',
      meaning: '',
    });

    this.input.focus();
  };

  handleCloseError = () => {
    this.setState({
      error: null,
    });
  };

  saveWord = async values => {
    this.setState({
      isSaving: true,
    });

    if (!values._id) {
      await axios.post(`${API_URL}/add`, values);
    } else {
      await axios.put(`${API_URL}/${values._id}`, values);
    }

    const words = await this.getWords();

    this.setState({
      _id: null,
      description: '',
      isSaving: false,
      meaning: '',
      words,
    });

    this.input.focus();
  };

  deleteWord = async evt => {
    const { id } = evt.target;

    await axios.delete(`${API_URL}/${id}`);

    const words = await this.getWords();

    this.setState({
      words,
    });
  };

  render() {
    const {
      _id,
      description,
      error,
      isFetching,
      isSaving,
      meaning,
      words,
    } = this.state;

    return (
      <div className="container">
        {isFetching ? (
          <div className="spinner">
            <LoopingRhombusesSpinner color="#2f80ed" />
          </div>
        ) : (
          <Fragment>
            <div className="form">
              <input
                ref={el => (this.input = el)}
                className="field"
                id="description"
                onChange={this.handleChangeText}
                placeholder="Escreva uma descrição"
                value={description}
              />
              <input
                className="field"
                id="meaning"
                onChange={this.handleChangeText}
                placeholder="Escreva um significado"
                value={meaning}
              />
              <button
                className="button primary"
                onClick={this.handleSaveButton}
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
              {_id && (
                <button
                  className="button secondary"
                  onClick={this.handleCancel}
                >
                  Cancelar
                </button>
              )}
            </div>
            {error && (
              <div className="error">
                Description and meaning are required!{' '}
                <span onClick={this.handleCloseError}>✖</span>
              </div>
            )}
            <div>
              {words.length > 0 ? (
                words.map(w => (
                  <div className="word" key={w._id}>
                    <div className="word-header">
                      <h1>{w.description}</h1>
                      <div>
                        <span
                          id={w._id}
                          onClick={this.handleEdit}
                          className="option"
                        >
                          Editar
                        </span>
                        <span
                          id={w._id}
                          className="option"
                          onClick={this.deleteWord}
                        >
                          Deletar
                        </span>
                      </div>
                    </div>
                    {w.meaning}
                  </div>
                ))
              ) : (
                <div className="no-results">Nenhuma palavra encontrada</div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
