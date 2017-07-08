# Plagiarism-Checker-Part-I

##### This app is designed to relieve the cognitive load teachers face in their hard task of educating the masses (for example, through the ability of running intraclass cheating checks) while offering constructive insights about the way students appropriate new knowledge (through the ability for example to compare en mass, primary sources and assignments)

*The goal is to decode the many faces of repetitive patterns in learning.*

#### Description in Greek

###### Overview 

Μέσα από ένα αριθμητικό κριτήριο ύποπτων προτάσεων το οποίο θέτει ο χρήστης, η εφαρμογή μαρκάρει τα ύποπτα ζευγάρια των μαθητών κ έτσι φτιάχνει έναν δισδιάστατο χάρτη κοινωνικής δικτύωσης (picτure_sample_2).

###### Specifics 

Τα complex calculations γίνονται με τη βοήθεια web workers προκειμένου η εφαρμογή να μη "παγώσει". 'Υστερα μέσα από ένα αριθμητικό κριτήριο ύποπτων προτάσεων το οποίο θέτει ο χρήστης, η εφαρμογή μαρκάρει τα ύποπτα ζευγάρια των μαθητών κ έτσι φτιάχνει έναν δισδιάστατο χάρτη κοινωνικής δικτύωσης (δείτε picτure_sample attachment_2) όπου κάθε μαθητής αναπαριστάται από ένα div element σε έναν κάνναβο 600x300 και κάθε πιθανή σχέση, από μια τρισδιάστατη προοπτική γέφυρα ζωγραφισμένη ως hover event από ένα canvas element πάνω από το κάνναβο (συντεταγμένες της γέφυρας δίνονται από τον υπολογισμό ενός vector space).

#### Description in English

###### Overview



###### Specifics



##### Quick-start: 

* Enter the number of assignments you wish to process. 

* Set the numerical criterion for a red and yellow connection ie how many similar or partially similar sentences have to be between a pair of assignements for the pair to be marked as red or yellow.

* Press Step 1. This will generate random input data for testing purposes according to the class size.

* Press Step 2. This will activate worker no1 -codenamed "manager"- and generate (among other things) all possible student/assignement pairs.

* Press Step 3. This will activate worker no2 -codenamed "contractor"- and generate data about each and every assignment pair. This can take from secs to hours, according to the size of input that is being processed, hence the use of a progress bar in order for the user to get a feeling of what is going on. This will also draw, based on the contractor's work, all the suspicious connections inside the class and create another "status report" div that explicitly states any connection every single student might have with another of its peers.

* Hover over any of the boxes of the status report and see instantly which target is representing which student.

* Hover over any of the interconnected targets and see via custom made 3d graphics how students connect with each other. 
