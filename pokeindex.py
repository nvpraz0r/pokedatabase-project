import requests
from flask import Flask, redirect, url_for, render_template, request,flash
from forms import RegistrationForm, LoginForm

app = Flask(__name__)

@app.route('/')
def index():    
    return render_template('index.html')    

@app.route("/pokedex", methods = ['GET', 'POST'])
def pokemon():
    try:       
        pokemon = request.form['pkm']
        pokemon = pokemon.lower()
        getPokemon = requests.get('https://pokeapi.co/api/v2/pokemon/{}'.format(pokemon))
        pokemonJson = getPokemon.json()

        return render_template('pokedex.html', pkm=pokemonJson)
    except:
        flash('Home: Pokemon not found')
        return render_template('index.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = ResgistrationForm()
    if form.validate_on_submit():
        flash(f'Account Created for {form.username.data}!','success')
        return redirect(url_for('index'))
    return render_template('register.html', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'admin@gmail.com' and form.password.data == 'hello':
            flash('Login successful')
            return redirect(url_for('index'))
        else:
            flash('Login unsuccessful', 'danger')
    return render_template('login.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)