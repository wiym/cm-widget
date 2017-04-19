(function () {


    var userConfig;
    var tagToAdd, version, application;
    var apiUrl = 'https://20pgh5r6fi.execute-api.eu-west-1.amazonaws.com/dev/feedbacks/team'

    var options = {};
    options.panelTitle = 'Feedback';
    options.labelBtnPopup = 'Have a feedback?';
    options.labelHeaderPopup = 'Send a feedback';
    options.labelDescPopup = 'How would you rate your experience on our tool?';
    options.labelNotation = 'How do you feel  - required';
    options.labelComment = 'Explain your feedback - required';
    options.labelEmail = 'Email';
    options.labelBtnSend = 'Send feedback';
    options.feedbackSuccess = 'Your feedback was successfully sent.';
    //options.labelShortcut = 'you can press your <span class="u-font--bold">F</span> touch to open this panel.'
    options.trad1 = 'Pas du tout satisfaisante';
    options.trad2 = 'Peu satisfaisante';
    options.trad3 = 'Satisfaisante';
    options.trad4 = 'Très satisfaisante';
    options.trad5 = 'Extrèmement satisfaisante';

    var note = '', email = '', comment = '', data = [], base64 = '';

    var btnPopupTpl = '<a data-html2canvas-ignore href="#" data-action="openFeedback" class="indy-button indy-button--primary indy-button--feedback">' + options.labelBtnPopup + '</a>';
    var popupTpl = '<div data-html2canvas-ignore data-popup="feedback" id="indy-w-container" class="indy-w-container">' +
        '<div class="indy-w-header">' +
        'Indiana' +
        '</div>' +
        '<div data-step-feedback="1" class="step-feedback-1">' +
        '<div class="indy-form-group">' +
        '<div class="indy-label indy-label--light">' +
        options.labelEmail +
        '<div>' +
        '<input type="email" class="indy-input">'+
        '</div>'+
        '</div>' +
        '</div>'+
        '<div class="indy-form-group">' +
        '<div class="indy-label indy-label--light">' +
        options.labelNotation +
        '</div>' +
        '<div class="indy-w-sentiment">' +
        '<div class="indy-btn-group">' +
        '<a class="indy-btn-group-item  indy-btn-group-item--inactive indy-note indy-note--2" data-note="-2" data-input="note" title="' + options.trad1 + '">' +
        '<svg width="27" height="26" viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'crying' +
        '</title>' +
        '<g fill="none" fill-rule="evenodd">' +
        '<path d="M15.354 22.597v-4.63c-.44-.312-.94-.534-1.47-.645-1.086-.227-2.22.024-3.097.648v5.193c.263.016.525.026.79.026 1.318 0 2.635-.21 3.777-.593z" fill="#FFCE00"/>' +
        '<path d="M23.89 10.892c0-.996-.113-1.963-.337-2.89-.638-1.33-1.52-2.522-2.592-3.513-1.966-1.176-4.28-1.817-6.74-1.727C7.43 3.01 2.13 8.713 2.38 15.5c.035.993.19 1.954.446 2.87.554 1.055 1.25 2.015 2.088 2.848.504.326 1.042.617 1.57.868V11.594h-.528V10.19H11.402v1.404h-.615v4.758c1.054-.49 2.228-.648 3.384-.406.412.086.833.22 1.184.4v-4.752h-.615V10.19h5.445v1.404h-.527v8.566c2.635-2.254 4.23-5.57 4.23-9.268z" fill="#FFCE00"/>' +
        '<path d="M23.56 8.002c.224.927.33 1.894.33 2.89 0 3.698-1.596 7.014-4.232 9.268v2.375C22.733 20.44 24.68 16.948 24.68 13c0-1.79-.393-3.484-1.12-4.998zM6.483 22.535v-.45c-.527-.25-1.08-.54-1.583-.867.487.484 1.056.925 1.583 1.317zM15.354 24.368v-1.77c-1.142.383-2.46.59-3.777.59-.265 0-.527-.01-.79-.025v1.205c.79.148 1.502.226 2.284.226.782 0 1.582-.078 2.284-.226z" fill="#FFB100"/>' +
        '<path d="M14.22 2.763c2.46-.09 4.778.55 6.744 1.726-2.068-1.914-4.832-3.085-7.864-3.085C6.707 1.405 1.505 6.607 1.505 13c0 1.937.478 3.764 1.322 5.37-.257-.916-.41-1.877-.447-2.87C2.132 8.713 7.434 3.01 14.22 2.763z" fill="#FFE454"/>' +
        '<path d="M9.38 11.594H7.89V23.37c.527.24.966.45 1.493.622V11.594zM18.253 11.594H16.76v12.398c.527-.173 1.054-.382 1.493-.623V11.593z" fill="#28E0FF"/>' +
        '<path d="M13.1 0C5.932 0 .1 5.832.1 13s5.832 13 13 13 13-5.832 13-13-5.832-13-13-13zM7.888 23.37V11.593H9.38v12.398c-.526-.173-.965-.382-1.492-.623zm2.9-.207V17.97c.877-.624 2.01-.875 3.095-.648.532.11 1.032.333 1.47.645v6.4c-.7.15-1.5.227-2.282.227-.78 0-1.493-.078-2.283-.226v-1.205zm5.972.83v-12.4h1.493V23.37c-.44.24-.966.45-1.493.622zm2.898-1.458V11.594h.527V10.19H14.74v1.404h.614v4.75c-.35-.177-.772-.312-1.183-.398-1.155-.242-2.33-.083-3.383.406v-4.758h.615V10.19H5.956v1.404h.527v10.942c-.527-.393-1.082-.834-1.57-1.318-.836-.833-1.54-1.793-2.094-2.848C1.975 16.764 1.5 14.937 1.5 13c0-6.393 5.203-11.595 11.596-11.595 3.032 0 5.797 1.17 7.865 3.084 1.073.99 1.96 2.18 2.597 3.512.727 1.514 1.12 3.21 1.12 4.998 0 3.948-1.947 7.44-5.022 9.535z" fill="#000"/>' +
        '</g>' +
        '</svg>' +
        '</a>' +
        '<a class="indy-btn-group-item indy-btn-group-item--inactive indy-note indy-note--1" data-input="note" data-note="-1" title="' + options.trad2 + '">' +
        '<svg width="27" height="26" viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'crying-1' +
        '</title>' +
        '<g transform="translate(.4)" fill="none" fill-rule="evenodd">' +
        '<path d="M24 10.964c0-.974-.122-1.92-.35-2.828-.653-1.303-1.558-2.468-2.653-3.44-2.01-1.15-4.377-1.776-6.89-1.688-6.935.242-12.35 5.824-12.1 12.467.038.97.196 1.912.458 2.81.566 1.03 1.292 1.97 2.148 2.786C6.578 22.29 8.92 23 11.436 23 18.376 23 24 17.61 24 10.964zm-6.596-2.15c.793 0 1.436.617 1.436 1.376 0 .76-.643 1.376-1.436 1.376-.793 0-1.436-.616-1.436-1.376 0-.76.643-1.375 1.436-1.375zm-8.885 0c.792 0 1.435.617 1.435 1.376 0 .76-.643 1.376-1.436 1.376-.794 0-1.437-.616-1.437-1.376 0-.76.643-1.375 1.436-1.375zm0 12.802c-2.018 0-3.66-1.572-3.66-3.504 0-.82.535-1.843 1.633-3.13.755-.887 1.5-1.566 1.532-1.594l.494-.45.493.45c.03.028.777.708 1.532 1.593.387.455.703.876.95 1.267 1.034-.182 2.108-.177 3.164.034 1.907.383 3.62 1.41 4.823 2.892l-1.133.845c-.995-1.225-2.41-2.074-3.985-2.39-.754-.15-1.52-.173-2.266-.08.05.2.077.387.077.565 0 1.932-1.64 3.504-3.658 3.504z" fill="#FFCE00"/>' +
        '<path d="M23.853 8c.226.95.347 1.94.347 2.96 0 6.96-5.57 12.6-12.443 12.6-2.492 0-4.81-.742-6.757-2.02C7.122 23.678 10.046 25 13.268 25 19.738 25 25 19.67 25 13.12c0-1.832-.412-3.57-1.147-5.12z" fill="#FFB100"/>' +
        '<path d="M13.416 2.36c2.402-.09 4.664.552 6.584 1.73C17.98 2.173 15.282 1 12.32 1 6.08 1 1 6.212 1 12.62c0 1.94.467 3.77 1.29 5.38-.25-.918-.4-1.88-.436-2.876C1.612 8.324 6.79 2.608 13.416 2.36z" fill="#FFE454"/>' +
        '<path d="M13 0C5.832 0 0 5.832 0 13s5.832 13 13 13 13-5.832 13-13S20.168 0 13 0zm0 24.595c-3.185 0-6.073-1.29-8.17-3.377-.84-.833-1.55-1.793-2.103-2.848-.844-1.606-1.322-3.433-1.322-5.37C1.405 6.607 6.607 1.405 13 1.405c3.032 0 5.796 1.17 7.864 3.084 1.073.99 1.958 2.18 2.597 3.512.727 1.514 1.135 3.21 1.135 4.998 0 6.393-5.202 11.595-11.595 11.595z" fill="#000"/>' +
        '<circle fill="#000" cx="8.5" cy="10.5" r="1.5"/>' +
        '<ellipse fill="#000" cx="17.5" cy="10.5" rx="1.5" ry="1.5"/>' +
        '<path d="M8 15c-.942.972-2 2.33-2 3.023C6 19.113 6.897 20 8 20s2-.887 2-1.977c0-.695-1.058-2.052-2-3.023z" fill="#28E0FF"/>' +
        '<path d="M11.93 17.78c.714-.097 1.447-.074 2.17.083 1.508.327 2.863 1.207 3.815 2.478L19 19.466c-1.152-1.537-2.792-2.602-4.62-3-1.01-.218-2.038-.223-3.027-.034-.238-.405-.54-.84-.91-1.312-.724-.92-1.438-1.623-1.468-1.653L8.502 13l-.472.465c-.03.03-.744.734-1.467 1.653C5.51 16.453 5 17.516 5 18.365 5 20.37 6.57 22 8.502 22c1.93 0 3.503-1.63 3.503-3.635 0-.184-.026-.38-.075-.585zm-3.428 2.793c-1.173 0-2.127-.99-2.127-2.208 0-.773 1.126-2.29 2.128-3.375 1 1.085 2.127 2.6 2.127 3.375 0 1.218-.955 2.208-2.128 2.208z" fill="#000"/>' +
        '</g>' +
        '</svg>' +
        '</a>' +
        '<a class="indy-btn-group-item indy-btn-group-item--inactive indy-note indy-note-0" data-input="note" data-note="0" title="' + options.trad3 + '">' +
        '<svg width="27" height="26" viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'neutral' +
        '</title>' +
        '<g transform="translate(.5)" fill="none" fill-rule="evenodd">' +
        '<path d="M23.804 10.892c0-.996-.12-1.963-.343-2.89-.638-1.33-1.523-2.522-2.596-3.513-1.967-1.176-4.283-1.817-6.743-1.727C7.335 3.01 2.033 8.713 2.28 15.5c.036.993.19 1.954.447 2.87.553 1.055 1.264 2.015 2.102 2.848 1.922 1.246 4.214 1.97 6.677 1.97 6.79 0 12.297-5.505 12.297-12.296zM17.45 8.696c.777 0 1.406.63 1.406 1.405 0 .777-.63 1.407-1.406 1.407-.776 0-1.405-.63-1.405-1.406 0-.775.63-1.404 1.405-1.404zm-8.696 0c.777 0 1.406.63 1.406 1.405 0 .777-.63 1.407-1.406 1.407-.776 0-1.405-.63-1.405-1.406 0-.775.628-1.404 1.404-1.404z" fill="#FFCE00"/>' +
        '<path d="M23.46 8.002c.224.927.344 1.894.344 2.89 0 6.79-5.506 12.297-12.297 12.297-2.463 0-4.755-.726-6.678-1.972 2.097 2.085 4.985 3.376 8.17 3.376 6.393 0 11.594-5.2 11.594-11.594 0-1.79-.407-3.484-1.133-4.998z" fill="#FFB100"/>' +
        '<path d="M14.12 2.763c2.46-.09 4.778.55 6.744 1.726C18.796 2.575 16.032 1.404 13 1.404 6.607 1.405 1.405 6.607 1.405 13c0 1.937.478 3.764 1.322 5.37-.257-.916-.41-1.877-.447-2.87C2.032 8.713 7.334 3.01 14.12 2.763z" fill="#FFE454"/>' +
        '<path d="M13 0C5.832 0 0 5.832 0 13s5.832 13 13 13 13-5.832 13-13S20.168 0 13 0zm0 24.594c-3.185 0-6.074-1.29-8.17-3.376-.84-.833-1.55-1.793-2.103-2.848-.844-1.606-1.322-3.433-1.322-5.37C1.405 6.607 6.607 1.405 13 1.405c3.032 0 5.796 1.17 7.864 3.084 1.073.99 1.958 2.18 2.597 3.512.727 1.514 1.134 3.21 1.134 4.998 0 6.393-5.2 11.594-11.594 11.594z" fill="#000"/>' +
        '<path fill="#000" d="M8.535 16.6h8.784v1.406H8.534z"/>' +
        '<ellipse fill="#000" cx="8.754" cy="10.101" rx="1.405" ry="1.405"/>' +
        '<ellipse fill="#000" cx="17.45" cy="10.101" rx="1.405" ry="1.405"/>' +
        '</g>' +
        '</svg>' +
        '</a>' +
        '<a class="indy-btn-group-item indy-btn-group-item--inactive indy-note indy-note-1" data-input="note" data-note="1" title="' + options.trad4 + '">' +
        '<svg width="27" height="26" viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'happy-1' +
        '</title>' +
        '<g transform="translate(.7)" fill="none" fill-rule="evenodd">' +
        '<path d="M23.804 10.892c0-.996-.12-1.963-.343-2.89-.638-1.33-1.523-2.522-2.596-3.513-1.967-1.176-4.283-1.817-6.743-1.727C7.335 3.01 2.033 8.713 2.28 15.5c.036.993.19 1.954.447 2.87.553 1.055 1.264 2.015 2.102 2.848 1.922 1.246 4.214 1.97 6.677 1.97 6.79 0 12.297-5.505 12.297-12.296zm-6.456-2.81c.776 0 1.405.628 1.405 1.404 0 .776-.63 1.406-1.405 1.406-.776 0-1.406-.63-1.406-1.406 0-.776.63-1.405 1.406-1.405zm-8.696 0c.776 0 1.405.628 1.405 1.404 0 .776-.63 1.406-1.405 1.406-.776 0-1.406-.63-1.406-1.406 0-.776.63-1.405 1.406-1.405zM5.095 13h15.81c0 4.366-3.54 7.905-7.905 7.905-4.366 0-7.905-3.54-7.905-7.905z" fill="#FFCE00"/>' +
        '<path d="M23.46 8.002c.224.927.344 1.894.344 2.89 0 6.79-5.506 12.297-12.297 12.297-2.463 0-4.755-.726-6.678-1.972 2.097 2.085 4.985 3.376 8.17 3.376 6.393 0 11.594-5.2 11.594-11.594 0-1.79-.407-3.484-1.133-4.998z" fill="#FFB100"/>' +
        '<path d="M14.12 2.763c2.46-.09 4.778.55 6.744 1.726C18.796 2.575 16.032 1.404 13 1.404 6.607 1.405 1.405 6.607 1.405 13c0 1.937.478 3.764 1.322 5.37-.257-.916-.41-1.877-.447-2.87C2.032 8.713 7.334 3.01 14.12 2.763z" fill="#FFE454"/>' +
        '<path d="M13 0C5.832 0 0 5.832 0 13s5.832 13 13 13 13-5.832 13-13S20.168 0 13 0zm0 24.594c-3.185 0-6.074-1.29-8.17-3.376-.84-.833-1.55-1.793-2.103-2.848-.844-1.606-1.322-3.433-1.322-5.37C1.405 6.607 6.607 1.405 13 1.405c3.032 0 5.796 1.17 7.864 3.084 1.073.99 1.958 2.18 2.597 3.512.727 1.514 1.134 3.21 1.134 4.998 0 6.393-5.2 11.594-11.594 11.594z" fill="#000"/>' +
        '<path d="M12.994 19.5c3.102 0 5.697-2.184 6.34-5.095H6.655c.643 2.91 3.24 5.095 6.34 5.095z" fill="#FFF"/>' +
        '<path d="M20.905 13H5.095c0 4.366 3.54 7.905 7.905 7.905 4.366 0 7.905-3.54 7.905-7.905zm-1.58 1.405h.01c-.644 2.91-3.24 5.095-6.34 5.095-3.102 0-5.698-2.184-6.342-5.095h12.67z" fill="#000"/>' +
        '<ellipse fill="#000" cx="8.652" cy="9.486" rx="1.405" ry="1.405"/>' +
        '<circle fill="#000" cx="17.348" cy="9.486" r="1.405"/>' +
        '</g>' +
        '</svg>' +
        '</a>' +
        '<a class="indy-btn-group-item indy-btn-group-item--inactive indy-note indy-note-2" data-input="note" data-note="2" title="' + options.trad5 + '">' +
        '<svg width="27" height="26" viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'in-love' +
        '</title>' +
        '<g fill="none" fill-rule="evenodd">' +
        '<path d="M24.704 10.892c0-.996-.12-1.963-.343-2.89-.638-1.33-1.523-2.522-2.596-3.513-1.967-1.176-4.283-1.817-6.743-1.727C8.235 3.01 2.933 8.713 3.18 15.5c.036.993.19 1.954.447 2.87.553 1.055 1.264 2.015 2.102 2.848 1.922 1.246 4.214 1.97 6.677 1.97 6.79 0 12.297-5.505 12.297-12.296zm-8.545-2.99c.402-.39.937-.607 1.506-.607.51 0 1.023.184 1.416.543.393-.36.906-.543 1.416-.543.57 0 1.104.216 1.507.608.31.3.68.843.68 1.715 0 1.674-2.653 3.727-3.184 4.122l-.418.31-.42-.31c-.53-.395-3.18-2.448-3.18-4.122 0-.872.368-1.414.677-1.715zM5.38 9.62c0-.872.368-1.414.678-1.715.403-.392.938-.608 1.507-.608.51 0 1.023.184 1.416.543.394-.36.907-.543 1.417-.543.57 0 1.104.216 1.507.608.31.3.678.843.678 1.715 0 1.674-2.65 3.727-3.182 4.122l-.42.31-.418-.31c-.53-.395-3.183-2.448-3.183-4.122zm2.89 6.368h11.61c0 3.202-2.6 5.805-5.805 5.805-3.205 0-5.804-2.602-5.804-5.804z" fill="#FFCE00"/>' +
        '<path d="M24.36 8.002c.224.927.344 1.894.344 2.89 0 6.79-5.506 12.297-12.297 12.297-2.463 0-4.755-.726-6.678-1.972 2.097 2.085 4.985 3.376 8.17 3.376 6.393 0 11.594-5.2 11.594-11.594 0-1.79-.407-3.484-1.133-4.998z" fill="#FFB100"/>' +
        '<path d="M15.02 2.763c2.46-.09 4.778.55 6.744 1.726-2.068-1.914-4.832-3.085-7.864-3.085C7.507 1.405 2.305 6.607 2.305 13c0 1.937.478 3.764 1.322 5.37-.257-.916-.41-1.877-.447-2.87C2.932 8.713 8.234 3.01 15.02 2.763z" fill="#FFE454"/>' +
        '<path d="M13.9 0C6.732 0 .9 5.832.9 13s5.832 13 13 13 13-5.832 13-13-5.832-13-13-13zm0 24.594c-3.185 0-6.074-1.29-8.17-3.376-.84-.833-1.55-1.793-2.103-2.848-.844-1.606-1.322-3.433-1.322-5.37 0-6.393 5.202-11.595 11.595-11.595 3.032 0 5.796 1.17 7.864 3.084 1.073.99 1.958 2.18 2.597 3.512.727 1.514 1.134 3.21 1.134 4.998 0 6.393-5.2 11.594-11.594 11.594z" fill="#000"/>' +
        '<path d="M7.565 8.7c-.36 0-.78.24-.78.918 0 .46.866 1.593 2.196 2.668 1.33-1.075 2.197-2.208 2.197-2.668 0-.677-.42-.917-.78-.917-.168 0-.713.064-.713.874H8.278c0-.81-.546-.873-.713-.873z" fill="#E36600"/>' +
        '<path d="M8.98 14.05l.42-.31c.53-.395 3.182-2.448 3.182-4.122 0-.872-.37-1.414-.678-1.715-.403-.392-.938-.608-1.507-.608-.51 0-1.023.184-1.416.543-.393-.36-.905-.543-1.415-.543-.57 0-1.104.216-1.507.608-.31.3-.68.843-.68 1.715 0 1.674 2.653 3.727 3.184 4.122l.42.31zm.704-4.476c0-.81.545-.873.713-.873.36 0 .78.24.78.918 0 .46-.866 1.593-2.196 2.668-1.33-1.075-2.195-2.208-2.195-2.668 0-.677.42-.917.78-.917.167 0 .713.064.713.874h1.406z" fill="#000"/>' +
        '<path d="M17.666 8.7c-.36 0-.78.24-.78.918 0 .46.866 1.593 2.196 2.668 1.33-1.075 2.196-2.208 2.196-2.668 0-.677-.42-.917-.78-.917-.167 0-.713.064-.713.874H18.38c0-.81-.546-.873-.714-.873z" fill="#E36600"/>' +
        '<path d="M18.663 13.74l.42.31.418-.31c.533-.395 3.184-2.448 3.184-4.122 0-.872-.37-1.414-.68-1.715-.4-.392-.937-.608-1.506-.608-.51 0-1.022.184-1.416.543-.393-.36-.906-.543-1.415-.543-.57 0-1.105.216-1.508.608-.31.3-.68.843-.68 1.715 0 1.674 2.652 3.727 3.183 4.122zm1.122-4.166c0-.81.546-.873.713-.873.36 0 .78.24.78.918 0 .46-.866 1.593-2.196 2.668-1.33-1.075-2.196-2.208-2.196-2.668 0-.677.42-.917.78-.917.168 0 .713.064.713.874h1.405z" fill="#000"/>' +
        '<path d="M14.065 20.385c1.935 0 3.57-1.255 4.16-2.993h-8.32c.59 1.738 2.226 2.993 4.16 2.993z" fill="#FFF"/>' +
        '<path d="M19.88 15.986H8.27c0 3.202 2.6 5.805 5.805 5.805 3.206 0 5.805-2.602 5.805-5.804zm-1.676 1.406h.02c-.588 1.738-2.224 2.993-4.16 2.993-1.933 0-3.57-1.255-4.158-2.993h8.298z" fill="#000"/>' +
        '</g>' +
        '</svg>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="indy-form-group">' +
        '<div class="indy-label indy-label--light">' +
        'Your feedback' +
        '</div>' +
        '<div>' +
        '<textarea name="" id="" rows="3" class="indy-input indy-comment"></textarea>' +
        '</div>' +
        '</div>' +
        '<div class="indy-w-footer">' +
        '<a href="#" class="indy-button indy-button--primary indy-button--small indy-close-feedback"  data-action="closeFeedback">close</a>' +
        '<a href="#" class="indy-button indy-button--success indy-button--small indy-send-feedback" data-action="sendFeedback">send the feedback</a>' +
        '</div>' +
        '</div>' +
        '<div data-step-feedback="success" class="indy-center indy-feedback-success">' +
        '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
        '<title>' +
        'Success' +
        '</title>' +
        '<path d="M32 0C14.327 0 0 14.327 0 32c0 17.674 14.327 32 32 32 17.674 0 32-14.326 32-32C64 14.327 49.674 0 32 0zm.427 60.587c-15.528 0-28.16-12.682-28.16-28.192S16.9 4.267 32.427 4.267c15.527 0 28.16 12.618 28.16 28.128s-12.633 28.192-28.16 28.192zm12.79-40.365L26.403 39.434l-8.473-8.598c-.784-.794-2.053-.794-2.836 0-.783.794-.783 2.082 0 2.876l9.92 10.066c.783.794 2.05.794 2.835 0 .09-.09.167-.19.237-.294L48.054 23.1c.78-.795.78-2.083 0-2.878-.784-.794-2.053-.794-2.836 0z" fill-rule="nonzero" fill="#10CFBD"/>' +
        '</svg>' +
        '<p>' + options.feedbackSuccess + '</p>' +
        '</div>' +
        '</div>';

    var gec = function (id, array) {
        id = id.replace('\.', '');
        var e = document.getElementsByClassName(id);
        if (array) {
            return e
        }
        else {
            return e[0] || {};
        }
    };
    var addEvent = function (element, evtType, callback, capture) {
        if (element.addEventListener instanceof Function) {
            element.addEventListener(evtType, callback, capture);
        }
        else {
            element.attachEvent('on' + evtType, callback);
        }
    };

    var addElem = function (elemType, attrs, elemText, parent) {
        parent = parent || document.body;
        var b = document.createElement(elemType);
        if (attrs) {
            for (var a in attrs) {
                b[a] = attrs[a];
            }
        }
        if (elemText) {
            b.innerHTML = elemText;
        }
        parent.appendChild(b);
        return b;
    };
    var addClass = function (element, className) {
        if (element.className && element.className.indexOf(className) == -1) {
            element.className += ' ' + className;
        }

        return element;
    };
    var removeClass = function (element, className) {
        if (element.className && element.className.indexOf(className) !== -1) {
            element.className = element.className.replace(className, '');
        }

        return element;
    };

    function addActionPopup() {
        addEvent(gec('indy-button--feedback'), 'click', actionOpenPopup)
    }

    function actionOpenPopup() {

        addClass(gec('indy-button--feedback'), 'is-hide');
        addClass(gec('indy-w-container'), 'indy-w-container--open');

        addClass(gec('indy-feedback-success'), 'is-hide');


        //gec('indy-input-email').focus();

        //TODO
        var notes = gec('indy-note', true);
        notes = Array.prototype.slice.call(notes);

        notes.map(function (n) {
            addEvent(n, 'click', function (e) {
                note = Number(n.className.match(/indy-note-([\-\d]+)/)[1]);
                addClass(gec('indy-note'), 'indy-btn-group-item--inactive');
                removeClass(n, 'indy-btn-group-item--inactive');
                console.log(note);
            })
        });


        addEvent(gec('indy-close-feedback'), 'click', actionClosePopup)

    }

    function actionClosePopup() {
        addClass(gec('indy-w-container'), 'is-hide');
        removeClass(gec('indy-w-container'), 'indy-w-container--open');
        removeClass(gec('indy-button--feedback'), 'is-hide');

    }

    function actionSendPopup() {
        comment = gec('indy-comment').value;

        if (note === '' && comment === '') {
            console.log('Veuillez noter votre expérience et saisir votre feedback.')
        } else if (comment === '') {
            console.log('Veuillez saisir votre feedback.')
        } else if (note === '') {
            console.log('Veuillez noter votre expérience.')
        } else {

            data['noteGlobale'] = note;
            data['description'] = comment;
            data['email'] = userConfig.email;
            data['userID'] = userConfig.userID;


            getScreenShot(function (screenshot) {
                data.capture = screenshot;
                sendToAPI(data, function (err) {
                    if (!err) {
                        //showNotification('successFeedback');
                        actionClosePopup();
                    }
                    else {
                        console.error(err)
                    }

                });

            });

        }
    }

    function getScreenShot(callback) {
        html2canvas(userConfig.divToCapture, {
            onrendered: function (canvas) {
                base64 = canvas.toDataURL();
                callback(base64);
            }
        });
    }

    function getBrowser() {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    function sendToAPI(data) {


        data['timestamp'] = new Date().getTime();
        data['isArchive'] = false;

        data['url'] = window.location.href;

        data['browser'] = getBrowser();

        tagToAdd = 'test-tag';
        application = 'test-application';
        version = 'test-version';
        channel = 'test-chanel';
        applicationName = 'test-applicationName';


        data['applicationName'] = userConfig.applicationName;


        var mydata = {
            noteGlobale: data.noteGlobale,
            browser: data.browser,
            email: data.email,
            capture: data.capture,
            description: data.description,
            url: data.url,
            applicationName: data.applicationName,
            source: 'widget'
        };

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", apiUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(mydata));


        return true;


    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function showNotification(type) {
        /*
         TODO
         $('[data-type-notification="' + type + '"]').addClass('fadeInUp is-shown');
         setTimeout(function () {
         $('[data-type-notification="' + type + '"]').addClass('fadeOutDown').removeClass('fadeInUp');
         }, 5000);
         setTimeout(function () {
         $('[data-type-notification="' + type + '"]').removeClass('fadeOutDown is-shown').removeClass('fadeInUp');
         }, 7000);
         */
    }

    window.indy = {
        init: function (config) {
            /*
             shortcuts : 'F' mess with inputs
             $(document).keyup(function (e) {
             if (e.keyCode == 27) {
             actionClosePopup();
             }
             });
             */
            userConfig = config;

            addElem('span', {}, btnPopupTpl);
            addElem('span', {}, popupTpl);
            addEvent(gec('indy-close-feedback'), 'click', function () {
                addClass(gec('indy-close-feedback'), 'fadeOutDown');
                removeClass(gec('indy-close-feedback'), 'fadeInUp');

                setTimeout(function () {
                    removeClass(gec('indy-close-feedback'), 'fadeOutDown');
                    removeClass(gec('indy-close-feedback'), 'is-shown');
                    removeClass(gec('indy-close-feedback'), 'fadeInUp');

                }, 7000);
            });
            addActionPopup();
            addEvent(gec('indy-send-feedback'), 'click', function (event) {
                event.stopPropagation();
                event.preventDefault();

                addClass(gec('step-feedback-1'), 'is-hide');


                setTimeout(function () {
                    gec('step-feedback-1').style.display = 'none';
                }, 100);

                setTimeout(function () {
                    removeClass(gec('indy-feedback-success', 'is-hide'));
                }, 100);

                setTimeout(function () {
                    actionClosePopup();
                    setTimeout(function () {
                        addClass(gec('indy-feedback-success', 'is-hide'));

                        gec('step-feedback-1').style.display = 'block';
                        removeClass(gec('step-feedback-1', 'is-hide'));

                    }, 500);
                }, 2000);


                actionSendPopup();
            });
        }
    }

}());
