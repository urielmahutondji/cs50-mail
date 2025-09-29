# 📧 Mail - Client de messagerie web

Projet développé dans le cadre du cours **CS50 Web Programming with Python and JavaScript (CS50W)**.  
L’objectif est de concevoir un **client de messagerie monopage**, permettant d’envoyer, recevoir, archiver et répondre à des e-mails via des appels API, entièrement stockés dans la base de données locale.

---

## 📌 Fonctionnalités principales

- **Gestion des utilisateurs**
  - Inscription, connexion et déconnexion
  - Authentification sécurisée via Django
  - Affichage personnalisé selon l’état de connexion

- **Boîtes aux lettres**
  - **Inbox** : e-mails reçus
  - **Sent** : e-mails envoyés
  - **Archive** : e-mails archivés
  - Navigation fluide entre les boîtes via JavaScript sans rechargement de page

- **Envoi et réponse aux e-mails**
  - Rédaction d’un nouvel e-mail (destinataires, sujet, corps)
  - Envoi via requête POST à l’API `/emails`
  - Réponse à un e-mail pré-remplie (destinataire, sujet “Re: …”, corps avec citation du message original)

- **Lecture et gestion des e-mails**
  - Consultation détaillée de chaque e-mail (expéditeur, destinataires, sujet, corps, timestamp)
  - Marquage automatique comme lu lors de la consultation
  - Archivage et désarchivage via PUT `/emails/<email_id>`
  - Différenciation visuelle des e-mails lus/non lus

- **Interface monopage (SPA)**
  - Contrôle des vues via JavaScript (`emails-view`, `compose-view`, `email-view`)
  - Affichage dynamique des e-mails récupérés via l’API
  - Utilisation de `fetch` pour communiquer avec l’API backend

---

## 🛠️ Stack technique

- **Backend :** Django (Python)
- **Frontend :** HTML, CSS, JavaScript
- **Base de données :** SQLite (par défaut)
- **Communication :** API REST intégrée à Django
- **Gestion des vues :** JavaScript monopage (Single Page Application)

---

## 🚀 Installation et exécution

### 1. Cloner le projet
```bash
git clone https://github.com/urielmahutondji/cs50-mail.git
cd mail
````

### 2. Créer et activer un environnement virtuel

```bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Appliquer les migrations

```bash
python manage.py makemigrations mail
python manage.py migrate
```

### 5. Lancer le serveur

```bash
python manage.py runserver
```

Accéder à l’application sur : [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 👤 Création d’un superutilisateur

```bash
python manage.py createsuperuser
```

➡ Accès à l’interface admin : [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 📝 Spécification respectée

1. Envoi d’e-mails via POST `/emails`
2. Consultation des boîtes aux lettres via GET `/emails/<mailbox>`
3. Consultation d’un e-mail spécifique via GET `/emails/<email_id>`
4. Marquage lu/non lu et archivage/désarchivage via PUT `/emails/<email_id>`
5. Réponse aux e-mails avec pré-remplissage des champs destinataire, sujet et corps

---

## 📸 Démonstration

[Voir la vidéo de démonstration](https://youtu.be/6QDxlkusEGM?si=Dn3r0RBa3iv3-Q1j)

---

## 📌 Roadmap (améliorations futures)

* Gestion en temps réel des e-mails (WebSockets)
* Notifications de nouveaux messages
* Thème clair/sombre
* Déploiement sur plateforme cloud

---

## 📜 Licence

Projet réalisé dans le cadre du **CS50 Web Programming with Python and JavaScript**.
Code disponible sous licence MIT.

---

## 👨‍💻 Auteur

Développé par **urielmahutondji** pour le projet **CS50W Mail**.

```


