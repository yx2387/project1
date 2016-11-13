#!/usr/bin/env python2.7

"""
Columbia W4111 Intro to databases
Example webserver

To run locally

    python server.py

Go to http://localhost:8111 in your browser


A debugger such as "pdb" may be helpful for debugging.
Read about it online.
"""

import os
from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import escape, flash, Flask, request, render_template, g, redirect, Response, session
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)
app.secret_key = 'some_secret'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#
# The following uses the postgresql test.db -- you can use this for debugging purposes
# However for the project you will need to connect to your Part 2 database in order to use the
# data
#
# XXX: The URI should be in the format of: 
#
#     postgresql://USER:PASSWORD@<IP_OF_POSTGRE_SQL_SERVER>/postgres
#
# For example, if you had username ewu2493, password foobar, then the following line would be:
#
#     DATABASEURI = "postgresql://ewu2493:foobar@<IP_OF_POSTGRE_SQL_SERVER>/postgres"
#
# Swap out the URI below with the URI for the database created in part 2
DATABASEURI = "postgresql://fp2360:nyx8h@104.196.175.120/postgres"


#
# This line creates a database engine that knows how to connect to the URI above
#
engine = create_engine(DATABASEURI)


#
# START SQLITE SETUP CODE
#
# after these statements run, you should see a file test.db in your webserver/ directory
# this is a sqlite database that you can query like psql typing in the shell command line:
# 
#     sqlite3 test.db
#
# The following sqlite3 commands may be useful:
# 
#     .tables               -- will list the tables in the database
#     .schema <tablename>   -- print CREATE TABLE statement for table
# 
# The setup code should be deleted once you switch to using the Part 2 postgresql database
#
#
# END SQLITE SETUP CODE
#

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.before_request
def before_request():
  """
  This function is run at the beginning of every web request 
  (every time you enter an address in the web browser).
  We use it to setup a database connection that can be used throughout the request

  The variable g is globally accessible
  """
  try:
    g.conn = engine.connect()
  except:
    print "uh oh, problem connecting to database"
    import traceback; traceback.print_exc()
    g.conn = None

@app.teardown_request
def teardown_request(exception):
  """
  At the end of the web request, this makes sure to close the database connection.
  If you don't the database could run out of memory!
  """
  try:
    g.conn.close()
  except Exception as e:
    pass


#
# @app.route is a decorator around index() that means:
#   run index() whenever the user tries to access the "/" path using a GET request
#
# If you wanted the user to go to e.g., localhost:8111/foobar/ with POST or GET then you could use
#
#       @app.route("/foobar/", methods=["POST", "GET"])
#
# PROTIP: (the trailing / in the path is important)
# 
# see for routing: http://flask.pocoo.org/docs/0.10/quickstart/#routing
# see for decorators: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
#
@app.route('/')
def index():
  """
  request is a special object that Flask provides to access web request information:

  request.method:   "GET" or "POST"
  request.form:     if the browser submitted a form, this contains the data in the form
  request.args:     dictionary of URL arguments e.g., {a:1, b:2} for http://localhost?a=1&b=2

  See its API: http://flask.pocoo.org/docs/0.10/api/#incoming-request-data
  """

  # DEBUG: this is debugging code to see what request looks like
  #print request.args


  #
  # example of a database query
  #
  #cursor = g.conn.execute("SELECT name FROM test")
  #names = []
  #for result in cursor:
  #  names.append(result['name'])  # can also be accessed using result[0]
  #cursor.close()

  #
  # Flask uses Jinja templates, which is an extension to HTML where you can
  # pass data to a template and dynamically generate HTML based on the data
  # (you can think of it as simple PHP)
  # documentation: https://realpython.com/blog/python/primer-on-jinja-templating/
  #
  # You can see an example template in templates/index.html
  #
  # context are the variables that are passed to the template.
  # for example, "data" key in the context variable defined below will be 
  # accessible as a variable in index.html:
  #
  #     # will print: [u'grace hopper', u'alan turing', u'ada lovelace']
  #     <div>{{data}}</div>
  #     
  #     # creates a <div> tag for each element in data
  #     # will print: 
  #     #
  #     #   <div>grace hopper</div>
  #     #   <div>alan turing</div>
  #     #   <div>ada lovelace</div>
  #     #
  #     {% for n in data %}
  #     <div>{{n}}</div>
  #     {% endfor %}
  #
  #context = dict(data = names)


  #
  # render_template looks in the templates/ folder for files.
  # for example, the below file reads template/index.html
  #
  if 's' in session:
    return redirect('/home_s')
  elif 'i' in session:
    return redirect('/home_i')
  return render_template("login.html")

#
# This is an example of a different path.  You can see it at
# 
#     localhost:8111/another
#
# notice that the functio name is another() rather than index()
# the functions for each app.route needs to have different names
#

@app.route('/get_course/<cid>/<csession>')
def get_course(cid,csession):
  print cid,csession
  cursor = g.conn.execute(
  """select c.course_id,c.session,c.course_name,o.year,o.season,u.user_name,c.credit,o.time,o.location,c.syllabus \
  from course c, open o,  instruct i,users u \
  where u.user_id=i.user_id and i.open_cid = o.open_cid 
  and o.course_id = %s and o.session = %s and c.course_id = o.course_id and o.session = c.session"""
  , cid,csession)
  Courses = [dict(id=row[0], session=row[1], name=row[2], year=row[3], season=row[4], inst=row[5], 
  credit=row[6], time=row[7], location=row[8], syllabus=row[9]) for row in cursor.fetchall()]
  cursor.close()
  print Courses

  cursor = g.conn.execute(
  """select a.assign_id, a.assign_title, a.assign_description, a.points, a.due_date, p.time
  from postassignment p, assignment a, open o, course c
  where o.course_id = %s and o.session = %s and c.course_id = o.course_id and o.session = c.session and p.open_cid = o.open_cid
  and p.assign_id = a.assign_id"""
  ,cid , csession)
  Assigns = [dict(id=row[0], title=row[1], des=row[2], points=row[3], due=row[4], time=row[5]) for row in cursor.fetchall()]
  print Assigns
  cursor.close()
  
  cursor = g.conn.execute(
  """select a.ann_id, a.ann_title, a.ann_content, p.time
  from postannouncement p, announcement a, open o, course c
  where o.course_id = %s and o.session = %s and c.course_id = o.course_id and o.session = c.session and p.open_cid = o.open_cid
  and p.ann_id = a.ann_id"""
  ,cid , csession)
  Anns = [dict(id=row[0], title=row[1], des=row[2], time=row[3]) for row in cursor.fetchall()]
  print Anns
  cursor.close()

  return render_template("course.html",Courses=Courses,Assigns = Assigns,Anns=Anns)

@app.route('/another')
def another():
  return render_template("anotherfile.html")

@app.route('/home_i')
def home_i():
  return render_template("instructor.html")

@app.route('/home_s')
def home_s():
  if 's' in session:
    print session['s']
    cursor = g.conn.execute(
    """select c.course_id,c.session,c.course_name,o.year,o.season,u.user_name 
    from course c, open o, take t, instruct i,users u 
    where u.user_id=i.user_id and i.open_cid = o.open_cid and t.user_id = %s and t.open_cid = o.open_cid 
    and o.course_id = c.course_id and o.session = c.session"""
    , session['s'])
    Courses = [dict(id=row[0], session=row[1], name=row[2], year=row[3], season=row[4], inst=row[5]) for row in cursor.fetchall()]
    cursor.close()

    cursor = g.conn.execute(
    """select u.user_id, u.user_name, u.gender, d.dep_name, s.enroll_date, u.email, u.phone
    from users u, belongs b, department d, student s
    where u.user_id = %s and u.user_id = s.user_id and u.user_id = b.user_id and b.dep_id = d.dep_id
    """
    ,session['s'])
    Userinfo = [dict(id=row[0], name=row[1], gender=row[2], dep=row[3], enroll=row[4], email=row[5], phone=row[6]) for row in cursor.fetchall()]
    cursor.close()

    print Courses

    cursor = g.conn.execute(
    """select q.que_title, q.que_description, u.user_name, a.time, q.que_id
    from question q, ask a, users u
    where u.user_id = %s and u.user_id = a.user_id and q.que_id = a.que_id
    """
    ,session['s'])
    Ques = [dict(title=row[0], des=row[1], name=row[2], time=row[3], id=row[4]) for row in cursor.fetchall()]
    print Ques
    cursor.close()


    cursor = g.conn.execute(
    """select r.ans_content, u2.user_name, r.time, q.que_id
    from question q, reply r, users u1, users u2, ask a
    where u1.user_id = %s and u1.user_id = a.user_id and q.que_id = a.que_id and r.que_id = q.que_id and r.user_id = u2.user_id
    """
    ,session['s'])
    Ans = [dict(content=row[0], name=row[1], time=row[2], id=row[3]) for row in cursor.fetchall()]
    print Ans
    cursor.close()


    return render_template("student.html",Courses=Courses,Userinfo=Userinfo, Ques = Ques,Ans=Ans)
  else:
    return redirect('/')

@app.route('/class_s')
def class_s():
  cursor = g.conn.execute("SELECT * FROM course")
#  courses = []
  Courses = [dict(id=row[0], session=row[1], name=row[2], syllabus=row[3], credit=row[4]) for row in cursor.fetchall()]
  cursor.close()
  print(Courses)
#  Courses = Courses
  return render_template("class_s.html",Courses=Courses)

@app.route('/log', methods=['POST'])
def log():
  name = request.form['uni']
  print name
  password = request.form['password']
  print password
  cursor = g.conn.execute("select u.password,u.user_type from users u where u.user_id = %s ",name);
  #print cursor.fetchone()[0] == password
  res = cursor.fetchone()
  if res == None:
    flash("User ID doesnt't exist!")
  elif res[0] == password:
    flash("Login Successful!")
    if res[1] == "Student":
      session['s'] = request.form['uni']
      return redirect('/home_s')
    else:
      session['i'] = request.form['uni']
      return redirect('/home_i')
  else:
    flash("Password Incorrect!")
  return redirect('/')


# Example of adding new data to the database
@app.route('/add', methods=['POST'])
def add():
  name = request.form['name']
  print name
  cmd = 'INSERT INTO test(name) VALUES (:name1), (:name2)';
  g.conn.execute(text(cmd), name1 = name, name2 = name);
  return redirect('/')

@app.route('/logout_s',)
def logout_s():
  session.pop('s',None)
  flash('You have successfully logged out!')
  return redirect('/')

@app.route('/logout_i',)
def logout_i():
  session.pop('i',None)
  flash('You have successfully logged out!')
  return redirect('/')

@app.route('/login')
def login():
    abort(401)
    this_is_never_executed()






if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)
  def run(debug, threaded, host, port):
    """
    This function handles command line parameters.
    Run the server using

        python server.py

    Show the help text using

        python server.py --help

    """

    HOST, PORT = host, port
    print "running on %s:%d" % (HOST, PORT)
    app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)


  run()
