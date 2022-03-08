import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import _ from "lodash";

import Recipe from "./Recipe";
import { fetchRecipes } from "../../actions/recipeActions";

function RankRecipesList({ fetchRecipes, recipes, auth }) {
  React.useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipes = () => {
    let userRecipes = recipes.filter(arr => arr.authorId == auth.user.id);
    userRecipes.sort((a, b) => a.rating.length < b.rating.length ? 1 : -1);
    return userRecipes.map(recipe => <Recipe recipe={recipe} key={recipe._id} />);
  };

  return (
    <section className="recipes-list">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs xl="6" lg="8" md="10">
            {recipes && auth.user ? renderRecipes() : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    recipes: Object.values(state.recipes)
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipes }
)(RankRecipesList);
