document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Send email
  document.querySelector('#compose-form').onsubmit = function(event) {
    event.preventDefault();
    
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      }),

    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        load_mailbox('sent');
    });
    
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch emails for the mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      console.log(emails);

      if (emails.length === 0) {
        const no_email_div = document.createElement('div');
        no_email_div.innerHTML = '<em>No emails in this mailbox.</em>';
        document.querySelector('#emails-view').append(no_email_div);
        return;
      }
      // ... do something else with emails ...
      emails.forEach(email => {
        const email_div = document.createElement('div');
        email_div.className = 'email-item';
        email_div.style.border = '1px solid black';
        email_div.style.padding = '10px';
        email_div.style.margin = '10px';
        email_div.style.backgroundColor = email.read ? '#f0f0f0' : 'white';

        email_div.innerHTML = `
          <strong>${email.subject}</strong> 
          <span>from: ${email.sender}</span> 
          <span style="float: right;">${email.timestamp}</span>
        `;

        email_div.addEventListener('click', () => {
          // Mark the email as read
          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          });

          // Load the email details view
          document.querySelector('#emails-view').innerHTML = `
            
            <p><strong>From:</strong> ${email.sender}</p>
            <p><strong>To:</strong> ${email.recipients.join(', ')}</p>
            <p><strong>Subject:</strong> ${email.subject}</p>
            <p><strong>Timestamp:</strong> ${email.timestamp}</p>
            <hr>
            <p>${email.body}</p>
            <button class="btn btn-primary" id="reply-button">Reply</button>
            <button class="btn btn-secondary" id="archive-button">${email.archived ? 'Unarchive' : 'Archive'}</button>
          `;

          document.querySelector('#reply-button').addEventListener('click', () => {
            compose_email();
            document.querySelector('#compose-recipients').value = email.sender;
            let subject = email.subject;
            if (!subject.startsWith('Re: ')) {
              subject = 'Re: ' + subject;
            }
            document.querySelector('#compose-subject').value = subject;
            document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote:\n${email.body}`;
          });

          document.querySelector('#archive-button').addEventListener('click', () => {
            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  archived: email.archived ? false : true
              })
            })
            .then(() => load_mailbox('inbox'));
          });
        });

        document.querySelector('#emails-view').append(email_div);
      });
  });
}