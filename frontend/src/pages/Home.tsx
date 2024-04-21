import React, { useState } from 'react';
import { AxiosError } from 'axios';
import useInput from '../hooks/useInputFile';
import api from '../utils/apiInstance';

function Home() {
  const csvFile = useInput(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!csvFile.value) {
      setAlertMessage('Nenhum arquivo selecionado!');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.patch('/upload', csvFile.value, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      csvFile.setValue(null);
      setAlertMessage('Produtos atualizados com sucesso!');
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }

      setIsLoading(false);
    }
  }

  async function handleVerification() {
    if (!csvFile.value) {
      setAlertMessage('Nenhum arquivo selecionado!');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post('/upload', csvFile.value, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlertMessage('');
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }

      setIsLoading(false);
    }
  }

  return (
    <main>
      <div>
        <h2>Atualizar Produtos</h2>
      </div>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <p>Arquivo CSV para atualização:</p>
          <input
            type="file"
            accept=".csv"
            onChange={csvFile.handleChange}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleVerification}
          >
            Verificar
          </button>
          <button type="submit">Enviar</button>

        </div>
        <div>
          <small>{alertMessage}</small>
        </div>
      </form>
    </main>
  );
}

export default Home;
