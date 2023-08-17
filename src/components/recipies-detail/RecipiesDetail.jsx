import classes from "./RecipiesDetail.module.css";
import img1 from "../../assets/canjiquinha.png";
import Navbar from "../navbar/Navbar";
import axios from "axios";

const RecipiesDetail = () => {

  return (
    <>
      <Navbar />
      <div className={classes.recipeContainer}>
        <h1>Canjiquinha com costela</h1>
        <img src={img1} />
        <span className={classes.recipeText}>
          <p>
            Canjiquinha com costela é uma receita fácil de ser feita e que pode
            render muito. Aprenda dica para saborizar outros preparos com os
            ossos que sobram!
          </p>
          <em>
            <p>Por Roselma Soares</p>
          </em>
          <p>
            De origem mineira, a canjiquinha com costela é uma receita bastante
            consumida em todo o Brasil. Sugestão para o almoço e o jantar, o
            prato é feito em uma panela só, o que deixa a receita bem prática.
            Páprica picante, pimenta-do-reino, cheiro-verde dão um sabor
            especial à receita. Confira o passo a passo completo e saiba como
            fazer canjiquinha com costela!
          </p>
          <h2>Ingredientes</h2>
          <ul>
            <li>1 quilo de costela de porco</li>
            <li>Suco de 1 limão</li>
            <li>4 dentes de alho picados</li>
            <li>1 colher de sopa de páprica picante</li>
            <li>Sal a gosto</li>
            <li>Pimenta-do-reino a gosto</li>
            <li>50 mililitros de óleo</li>
            <li>100 gramas de bacon picado</li>
            <li>Meia cebola picada</li>
            <li>1 tomate picado sem semente</li>
            <li>150 mililitros de água</li>
            <li>1 xícara de chá de canjiquinha</li>
            <li>50 gramas de manteiga gelada</li>
            <li>Cheiro-verde picado a gosto</li>
          </ul>
          <h2>Modo de preparo</h2>
          <ol>
            <li>
              Tempere 1 quilo de costela de porco com suco de 1 limão, 2 dentes
              de alho picados, 1 colher de sopa de páprica picante, sal a gosto
              e pimenta-do-reino a gosto. Cubra com plástico filme e deixe
              marinar por 2 horas.
            </li>
            <li>
              Depois do tempo, coloque as costelas em uma panela com 50
              mililitros de óleo. Frite dos dois lados e reserve a carne em um
              refratário.
            </li>
            <li>
              Na mesma panela, acrescente 100 gramas de bacon picado e deixe
              dourar. Adicione meia cebola picada, 2 dentes de alho picados, 1
              tomate picado sem semente e misture.
            </li>
            <li>
              Coloque novamente a costela na panela e despeje 150 mililitros de
              água. Misture, tampe a panela e deixe cozinhar em fogo médio por 1
              hora.
            </li>
            <li>
              Após o tempo, retire a costela e reserve. Reserve também um pouco
              do molho.
            </li>
            <li>
              Na panela, adicione 1 xícara de chá de canjiquinha e misture.
              Acrescente um pouco de água, 50 gramas de manteiga gelada e
              cheiro-verde picado a gosto. Misture.
            </li>
            <li>Sirva a canjiquinha com a costela e o molho reservados.</li>
          </ol>
        </span>
      </div>
    </>
  );
};

export default RecipiesDetail;



/*

{
 "msg": "New recipe created!",
 "recipe_id": 6,
 "title": "Macarrão doce com Leite",
 "ingredients": [
  {
   "recipe_id": 6,
   "name": "Açúcar",
   "quantity": "50",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Leite",
   "quantity": "2",
   "unit_measure": "Litros"
  },
  {
   "recipe_id": 6,
   "name": "Macarrão Parafuso",
   "quantity": "500",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Canela em pó",
   "quantity": "a gosto",
   "unit_measure": ""
  }
 ],
 "instructions": [
  "Em uma panela, adicione o leite e o açúcar e deixe ferver em fogo médio.",
  "Adicione o macarrão parafuso e cozinhe até ficar al dente, mexendo de vez em quando.",
  "Escorra o macarrão e reserve um pouco do leite.",
  "Sirva o macarrão doce em pratos individuais, regue com um pouco do leite reservado e polvilhe canela em pó por cima.",
  "Sirva quente e aproveite!"
 ]
}




*/ 
