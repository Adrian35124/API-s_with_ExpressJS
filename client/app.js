$(document).ready(() => {
  fetchChirps();
});

let fetchChirps = () => {
  $("#chirp-container").empty();
  $.get("/api/chirps/", (chirps) => {
    delete chirps.nextid;
    const writeArr = Object.entries(chirps);
    writeArr.reverse();
    writeArr.forEach((chirp) => {
      $("#chirp-container").append(
        `
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">${chirp[1].user}</h5>
                <p class="card-text">${chirp[1].text}</p>
            </div>
        </div>
        <div id="modal${chirp[0]}" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${chirp[1].user}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <textarea id="edit-chirp-message${chirp[0]}">${chirp[1].text}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onclick="editChirp(${chirp[0]}, '${chirp[1].user}', $('#edit-chirp-message${chirp[0]}').val())" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
            `
      );
    });
  });
};
let submitChirp = () => {
    const username = $("#username").val();
    const message = $("#message").val();
    const data = {
        user: username,
        text: message
    };

$.ajax("/api/chirps/", {
    data: JSON.stringify(data),
    method: "post",
    contentType: "application/json"
});

fetchChirps();
};

let deleteChirp = id => {
    $.ajax(`/api/chirps/${id}`, { method: "delete"});
};

let editChirp = (id, user, message) => {
    const chirpObj = {
        username: user,
        message: message
    }
    $.ajax(`/api/chirps/${id}`, {
        data: JSON.stringify(chirpObj),
        method: "put",
        contentType: "application/json"
    });
    fetchChirps();
}
