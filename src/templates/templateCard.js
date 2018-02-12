import type {Interview} from '../typedef';

export default (interview: Interview, cardToForm: boolean = false) => {
    return `
        <div class="interview-card__fields">
            <div class="form-group">
                <label class="title-secondary" for="fullName-${interview._id.$oid}">Full name</label>
                <input class="form-control fullname-input" id="fullName-${interview._id.$oid}" name='name' type="text" placeholder="Input full name" value="${interview.fullName}" ${cardToForm ? '' : 'readonly'}>
            </div>
            <div class="form-group">
                <label class="title-secondary" for="dateInput-${interview._id.$oid}">Birth date</label>
                <input class="form-control date-input" id="dateInput-${interview._id.$oid}" name='date' type="date" placeholder="Select date" value="${interview.birthDate}" ${cardToForm ? '' : 'readonly'}>
            </div>
            <div class="form-group">
                <label class="title-secondary" for="phoneInput-${interview._id.$oid}">Phone number</label>
                <input class="form-control phone-input" id='phoneInput-${interview._id.$oid}' name='tel' type="tel" placeholder="Input phone number" value="${cardToForm ? '' : `+${interview.phoneNumber}`}" ${cardToForm ? '' : 'readonly'}>
            </div>
            <div class="form-group">
                <label class="title-secondary" for="interviewNotes-${interview._id.$oid}">Interview</label>
                <textarea class="form-control interviewNotes" id='interviewNotes-${interview._id.$oid}' rows="5" cols="50" placeholder="Input interview text" ${cardToForm ? '' : 'readonly'}>${interview.interviewNotes}</textarea>
            </div>
        </div>
        
        ${cardToForm
        ?
        `<div class="interview-card__controls interview-card__new">
            <a class='btn btn-add' href="#">&#x2795;</a>
        </div>`
        : 
        `<div class="interview-card__controls">
            <a class='btn btn-edit' href="#">&#x270F;</a>
            <a class='btn btn-delete' href="#">&#x2716;</a>
        </div>
        <div class="interview-card__controls interview-card__edit hidden">
            <a class='btn btn-accept' href="#">&#x2714;</a>
            <a class='btn btn-cancel' href="#">&#x2796;</a>
        </div>`
        }`
};