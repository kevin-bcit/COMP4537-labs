const title_msg = document.getElementById('title_txt');
const header_index_msg = document.getElementById('header_index_txt');
const header_writer_msg = document.getElementById('header_writer_txt');
const header_reader_msg = document.getElementById('header_reader_txt');
const writer_msg = document.getElementById('writer_txt');
const reader_msg = document.getElementById('reader_txt');
const writer_rmv_btns = document.getElementsByClassName('writer_rmv_btn');
const writer_add_btn = document.getElementById('writer_add_btn');
const writer_stored_time = document.getElementById('writer_time_txt');
const reader_updated_time = document.getElementById('reader_time_txt');
const back_btn = document.getElementById('back_btn');

const pageName = window.location.pathname.split('/').pop().split('.')[0];

//load the required language at start
title_msg.innerText = TITLE_MSG;
if (pageName === 'index') {
    header_index_msg.innerHTML = HEADER_INDEX_MSG;
    writer_msg.innerHTML = WRITER_MSG;
    reader_msg.innerHTML = READER_MSG;
}
else if (pageName === 'writer') {
    header_writer_msg.innerHTML = HEADER_WRITER_MSG;
    writer_stored_time.innerHTML = WRITER_STORED_TIME;
    for (let i = 0; i < writer_rmv_btns.length; i++) {
        writer_rmv_btns[i].innerHTML = WRITER_RMV_MSG;
    }
    writer_add_btn.innerHTML = WRITER_ADD_MSG;
    back_btn.innerHTML = BACK_MSG;
}
else if (pageName === 'reader') {
    header_reader_msg.innerHTML = HEADER_READER_MSG;
    reader_updated_time.innerHTML = READER_UPDATED_TIME
    back_btn.innerHTML = BACK_MSG;
}