"use client";

import apiTMDB from "@/app/apis/apiSerie";
import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

export default function page(props) {
  const [series, setSeries] = useState({});

  useEffect(() => {
    buscarSeries();
  }, []);

  async function buscarSeries() {
    const resultado = await apiTMDB.get(
      "/tv/" + props.params.id + "?language=pt-BR"
    );

    const seriesRecebido = resultado.data;

    console.log(resultado.data);
    setSeries(seriesRecebido);
  }

  return (
    <Pagina titulo={series.name}>
      {/* if em jsx */}
      {series.id && (
        <div className="py-4">
          <Row>
            <Col md={3}>
              <CardImg
                src={"https://image.tmdb.org/t/p/w500/" + series.poster_path}
              />
            </Col>

            <Col md={9}>
              <p>
                <b>Data de Lançamento: </b>
                {series.first_air_date}
              </p>
              <p>
                <b>Nota: </b>
                {series.vote_average} ⭐
              </p>
              <p>
                <b>Quantidade de Temporadas: </b>
                {series.number_of_seasons}
              </p>
              <p>
                <b>Quantidade de Episódios: </b>
                {series.number_of_episodes}
              </p>
              <p>
                <b>Sinopse: </b>
                {series.overview}
              </p>
              <p>
                <b>Gêneros: </b>
              </p>
              <ul>
                {series.genres.map((item) => {
                  return <li>{item.name}</li>;
                })}
              </ul>
            </Col>
          </Row>
        </div>
      )}
    </Pagina>
  );
}