"use client";

import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Pagina from "./components/Pagina";
import apiTMDB from "./apis/apiSerie";


export default function page() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    buscarSeries();
  }, []);

  async function buscarSeries() {
    const resultado = await apiTMDB("/tv/popular?language=pt-BR");

    console.log(resultado.data.results);

    const seriesRecebidas = resultado.data.results;

    setSeries(seriesRecebidas);
  }

  return (
    <Pagina titulo="Series Populares">
      <Row md={4}>
        {/* pega cada item da lista e executa uma função */}
        {series.map((series) => {
          return (
            // padding up e down
            <Col className="py-2">
              {/* ocupa 100% do tamanho possivel */}
              <Card style={{ height: "100%" }}>
                <Card.Img
                  src={"https://image.tmdb.org/t/p/w500/" + series.poster_path}
                />
                <Card.Body>
                  <Card.Title> {series.original_name}</Card.Title>
                  <p>
                    <b>Nota:</b>
                    {series.vote_average} ⭐
                  </p>
                  <p>
                    <b>Lançamento:</b>
                    <br></br>
                    {series.first_air_date}
                  </p>
                </Card.Body>

                <Card.Footer className="text-end">
                  <Button href={"/series/" + series.id}>Detalhes</Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Pagina>
  );
}