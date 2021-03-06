$(document).ready(function () {
    $("#clientManagementTable").DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: "/graphql",
        type: "POST",
        data: { query: "query{ clients {email, id, created_at} }" },
        dataSrc: function (json) {
          //   console.log('json', json, json.data.users)
          return json.data.clients;
        },
      },
      // columnDefs: [
      //   {
      //     targets: -1,
      //     data: null,
      //     defaultContent:
      //       `<a href=""></a>`
      //   },
      // ]
      // ,
      columns: [
        {
          data: "email",
          display: "Email",
        },
        {
          data: null,
          display: "Action",
          render: function (data, type, row, meta) {
            return `<a class="btn btn-warning" href="/client-management/client/${row.id}">Edit</a>`;
          },
        },
      ],
      // dom: 'Bfrtip',
      // buttons: [
      //   {
      //     text: "New User",
      //     action: function (e, dt, node, config) {
      //       window.location = "/user-management/new"
      //     },
      //   },
      // ],
      // aoColumns: [
      //     {
      //         'mRender': function (data, type, row) {
      //                             return "<a href='/View/" + row[1] + ">link</a>";
      //                         }
      //     },
      // ]
    });
  });
  