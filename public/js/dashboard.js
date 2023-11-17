const newBookmarkButton = document.getElementById('newBookmarkButton');
const toggleFormButton = document.getElementById('toggleFormButton');

const newBookmarkFormHandler = async (event) => {
    event.preventDefault();
    try {
        const name = document.getElementById('new-bookmark-name').value.trim();
        const url = document.getElementById('new-bookmark-url').value.trim();
        const icon = document.getElementById('new-bookmark-icon').value.trim();

        if (name && url) {
            const response = await fetch('/api/bookmarks/newBookmark', {
                method: 'POST',
                body: JSON.stringify({ name, url, icon }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const responseData = await response.json();
                const newBookmark = responseData.bookmark;
                appendBookmarkToPage(newBookmark);
                clearFormInputs();
            } else {
                alert(response.statusText);
                console.log(response);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

const appendBookmarkToPage = (bookmark) => {
    const bookmarksList = document.getElementById('bookmarksList');

    const listItem = document.createElement('li');
    listItem.textContent = bookmark.name;

    bookmarksList.appendChild(listItem);
};

const clearFormInputs = () => {
    document.getElementById('new-bookmark-name').value = '';
    document.getElementById('new-bookmark-url').value = '';
    document.getElementById('new-bookmark-icon').value = '';
};

document.addEventListener('DOMContentLoaded', function () {
    const bookmarkFormSection = document.querySelector('.bookmark-form'); //selects the entirety of the bookmarkForm
    console.log(bookmarkFormSection); //logs the bookmarkForm object

    newBookmarkButton.addEventListener('click', newBookmarkFormHandler); //adds the 'click' EL to for the submission of new bookmarks (Test to see if this works within DOMContentLoaded) - WORKS

    toggleFormButton.addEventListener('click', function () { //adds the test class to the object 
        bookmarkFormSection.classList.toggle('collapsed');
    });
});

