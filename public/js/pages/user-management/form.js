var app = app || {};
app.user = {};


app.submitNewUser = (e) => {
  e.preventDefault();
  var email = $("#email").val(),
    name = $("#name").val(),
    password = $("#password").val();
  var variables, query;

  if (app.user.id) {
    variables = { email, name, password, id: app.user.id };
    query = `mutation ($email: String!, $name: String!, $password: String!, $id: ID!){
      upsertUser(email: $email, name: $name, password: $password, id: $id) {
        id
        email
        profile{
          id
          user_id
          name
        }
      }
    }`;
  } else {
    variables = { email, name, password };
    query = `mutation ($email: String!, $name: String!, $password: String!){
      upsertUser(email: $email, name: $name, password: $password) {
        id
        email
        profile{
          id
          user_id
          name
        }
      }
    }`;
  }

  $.post({
    type: "POST",
    url: "/graphql",
    data: {
      variables,
      query,
    },
    success: (result) => {
      location.href = "/user-management/form?id=" + result.data.upsertUser.id;
    },
  });
};

$("form").submit(app.submitNewUser);

app.loadUserForm = (id) => {
  app.userId = id;

  $.post({
    url: "/graphql",
    type: "POST",
    data: {
      query: `query($id: String!) {
        user(id: $id) {
          id
          email
          profile {
            name
          }
        }
      }`,
      variables: {
        id,
      },
    },
    success: function (result) {
      var user = result.data.user;
      app.user = user;

      var name = user.profile && user.profile.name ? user.profile.name : "";

      $("#name").val(name);
      $("#email").val(user.email);

      $('.user-email').each(function() {
        $(this).html(user.email);
     });
    },
  });
};

app.blockUser = () => {

}

app.deleteUser = () => {
  
}