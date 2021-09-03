import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Get page edits from admin_edit_form
function* fetchPageEdits(action) {
    try {
        const pageEdits = yield axios.get(`/api/adminEditForm/${action.payload.page_id}`);
        yield put({type: 'SET_PAGE_EDITS', payload: pageEdits.data}) // Loads page edits into reducer
    } catch (error) {
        console.log('Error getting pageEdits:', error);
        yield put({ type: 'FETCH_PAGE_EDITS_ERROR' });
    }
}

// Get page edits from admin_edit_form on a certain date
function* fetchPageEditsOnDate(action) {
    try {
        const pageEditsOnDate = yield axios.get(`/api/adminEditForm/page_on_date/${action.payload.page_id}`);
        yield put({type: 'SET_PAGE_EDITS_ON_DATE', payload: pageEditsOnDate.data}) // Loads page edits on date into reducer
    } catch (error) {
        console.log('Error getting pageEditsOnDate:', error);
        yield put({ type: 'FETCH_PAGE_EDITS_ON_DATE_ERROR' });
    }
}

// Add page edits to admin_edit_form
function* addPageEdits(action) {
    try {
        yield axios.post('/api/adminEditForm', action.payload); 
        yield put({ type: 'FETCH_PAGE_EDITS', payload: {page_id: action.payload.page_id} }); // Loads the updated page edits into reducer
    } catch (error) {
        console.log('Error adding pageEdits:', error);
        yield put({ type: 'ADD_PAGE_EDIT_ERROR' });
    }
}

// Delete page edits from admin_edit_form
function* deletePageEdits(action) {
    try {
        console.log(action);
        yield axios.delete(`/api/adminEditForm/${action.payload.id}`);
        yield put({ type: 'FETCH_PAGE_EDITS', payload: {page_id: action.payload.page_id} }); // Reloads page edits
    } catch (error) {
        console.log('Error deleting pageEdits:', error);
        yield put({ type: 'DELETE_PAGE_EDIT_ERROR' });
    }
}

function* adminEditSaga() {
  yield takeLatest('FETCH_PAGE_EDITS', fetchPageEdits);
  yield takeLatest('FETCH_PAGE_EDITS_ON_DATE', fetchPageEditsOnDate);
  yield takeLatest('ADD_PAGE_EDIT', addPageEdits);
  yield takeLatest('DELETE_PAGE_EDIT', deletePageEdits);
}

export default adminEditSaga;