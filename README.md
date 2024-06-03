# LDPC-Visual-Tools

# Introduction

Low density parity check (LDPC) codes are very powerful when it comes to performance and low-complexity iterative decoding. However, the main algorithms (belief propagation, message passing...) depend heavily on the lack of short cycles in their parity check matrix, also known as the H matrix. In this project, a set of tools has been implemented in order to visualize, generate and manage the relevant matrices that stem from the H matrix. Two main visual tools have been implemented for an easier visualization and manipulation of the root (H) matrix. A brief summarization of these tools would be:
Nodes and Factors Graph: input a matrix H and a set of filter values to generate and draw the graph. Additionally, the extended matrix can be generated and shifts can be performed.
PEG Matrix Generator: input the amount of variable nodes and a list of their degrees, as well as the amount of check nodes and their degrees. A degree represents how many connections it has. Then, an algorithm based on the Tanner Graph Algorithm used in the paper is run and an H matrix is generated (and drawn).
The main algorithm is Progressive Edge Growth (PEG) by Xiao-Yu Hu, Evangelos Eleftheriou and Dieter M. Arnold, which is a greedy (sub-optimum) method of constructing Tanner graphs having a large length of the shortest cycle. The relevant paper is "Regular and Irregular Progressive Edge-Growth Tanner Graphs" in IEEE Transactions on Information Theory, Vol. 51, No. 1, January 2005.


# Short cycles and graphing

LDPC codes are often represented with a large sparse binary matrix called the ‘parity check matrix’. Having such a matrix reduces the computation cost when multiplication matrices and is more suitable for multithreading interpretation methods (encoding and decoding), yielding a close-capacity boundary performance. 
For the visualization of the above mentioned matrix, a Tanner graph can be used. In order to construct such a graph the following conventions can be used:
Take the number of variable nodes and check nodes and list them as two horizontal containers (in this case, the variable nodes will be represented by circles and the check nodes by squares). By convention, the variable nodes will be at the top. The X check node and Y variable node can be connected by a line, if and only if in their respective edge H[X][Y] is equal to 1.
The H matrix (root matrix) can be “diagonally repeated” in order to generate the Extended Matrix (EM). This is done by placing copies of H along the main diagonal and filling the rest of the space with zeros. A module is the section containing the H matrix. The size of the EM will be module_count * H_rows and module_count * H_cols.


The Tanner Graph is generated with a process similar to depth-first tree construction, however since cycles will inevitably happen, will route back to the earliest used nodes as an attempt to maximize cycle lengths. More about the exact algorithm can be found in the paper mentioned in the introduction, which is the base for all the work done here.

Belief propagation and message passing rely on local computations. Each variable node will send its value to the connected check node. The check node will then perform a local computation and send the feedback to each of the connected variable nodes. This process will repeat until a general consensus is reached for all nodes. A short cycle in a Tanner graph will generate a dependency between nodes, which will cause computations to become inaccurate after each above-mentioned loop. Visually, a short cycle is tracing connections from node to node and getting a “loop” or cycle that will have a low number of vertices. For example, a cycle that goes N0 -> N1 -> N2 -> N3 -> N0, would be a short cycle. 


# Tools and Algorithms implemented:

Before reading below, please familiarize yourselves with these notations:
HM = H matrix, a matrix formed with only 1’s and 0’s that represent the bonds between variable nodes and check nodes, the variable nodes are the columns and the check nodes are the rows. If the location [i, j] is a 0, then no bond between check node i and variable node j exists. Similarly if it’s a 1, then a bond (connection) exists.
EM = Extended Matrix, a larger matrix formed by copying the HM diagonally and filling the empty space with zeros.
SM_x = “Shifted Matrix step x”; an EM will have multiple steps of row-shifts applied to it, rerouting the check node graph to eventually make the final product. SM_0 is identical to the EM, SM_1 shows the first change, SM_2 shows the next change, and so on.
Module = As you will read later, each change in the check node graph is “mirrored”, or modular, by design. The term Module refers to the smaller part of the graph that directly concerns the variable nodes and check nodes from the original HM. (As a reminder, the EM is initialized from multiple copies of an HM; these are the modules, and any change made to a module will be done for all modules in parallel).

Note: SM_0 is identical to the Extended Matrix (EM).
Note: The selected row and column cannot be a zero. Since these matrices represent edges in a graph, shifts can only be applied to variable nodes and check nodes that are connected.

Shifting enables the creation of a shifted matrix by interconnecting identical parallel modules, and if done in an appropriate manner, spawns a large girth cycle. The resulting matrix can handle larger data sets for LDPC without discarding the functional root. The “Nodes and Factors Graph” tool (add link here) allows the user to apply such sights and analyze the resulting matrix using a visual graph as well as the text. Other notable features include: highlighting modules or nodes, exporting the matrix, matrix compression, and adjusting the module count.
	
Going back to the PEG, the second main tool “PEG Matrix Generator” allows the user to take a number of variables and check nodes and their respective degrees of distribution in order to create an H matrix. Said matrix can then be exported for further use. A list with all the algorithms is attached along with their explanations (add link here), but the main ones worth mentioning are: “Tanner Greedy” which is based on the one in the source paper mentioned in the introduction and “Greedy” which handles the bonding of the nodes in a more “natural” manner using not a tree but an empty bilinear graph (like the one at the end of the Tanner process). Both of them are sub-optimal, but produce acceptable results with a minimized computation process.

An honorable mention are the “Matrix Wizard” tools: “Matrix Compressor” and “Matrix Decompressor” which are complementary to the above mentioned ones. To further explain this topic: resulting extended or shifted matrices can become quite large to store in a text file in a natural way. In order to suppress (compress) such an issue, a basic compressing rule has been created as follows, generating a single line string with no empty spaces. The compressed string follows the format: 

num_rows/num_cols/comp_values
num_rows is an integer, the number of rows in the matrix.
num_cols is an integer, the number of columns in the matrix.
comp_values is a compressed string representing the values within the matrix. It can be composed from combinations of the following components.

Any subsequence of 1’s and 0’s that has less than three consecutive repeating digits may simply be written as a binary string (cannot contain 000 or 111). Whenever three consecutive repeating digits are encountered, compression should be used; a subsequence consisting of all 1’s (111…1) will be written as “/subseq_length/” and a subsequence of all 0’s (000…0) will be written as “.sebseq_length.”; all of this is written on a single line with no whitespace. 

An example of compressing the extended matrix: 

12/24/10101.20.10101.21./3/.24.10101.20.10101.21./3/.24.10101.20.10101.21./3/.24.10101.20.10101.21./3/
	
From left to right:
12 		represents the row count
24 		represents the column count
10101 	is a regular sequence 
.20. 		represents twenty ‘zeroes’
10101 	is a regular sequence 
.21. 		represents twenty-one ‘zeroes’
/3/ 		represents three ‘ones’
Etc
	
This symmetrical “encryption” allows for an easy compression and decompression for larger matrices without significant loss of efficiency. 

# Algorithms - Tanner Greedy
	
Generating a Tanner Graph with the lowest possible short cycle with restricted parameters is quite difficult due to the algorithmic complexity. As mentioned before, however, PEG finds a sub-optimum solution that can yield a “good” result with a low algorithmic complexity. 
The algorithm implemented here, based on the one presented in the paper, takes a set of variable and check nodes and their respective degrees (represented as two lists of integers). It then starts with the first variable node and moves forward through both lists (alternating node types) and updating the connection lists. If the last-added node still has an open connection, then a new other-type-node will connect, or if all have been used, the next valid other-type-node will be chosen (valid here means looking for connection but not already connected to the current node).
When a list reaches the end, it begins again from the head of the list, forming a graph with cycles instead of a tree. It repeats this process until both degree-lists contain only 0’s (all connections have been made) and then a validification test is run to make sure that there are no overlaps in the H matrix (and notify if they are). (add an example here?)
The other algorithms are listed separately for readability. The Tanner Greedy is the most optimal out of these, however, other algorithms may produce interesting results with certain data sets.


# Implementation
	
The code is structured in a basic “Welcome Page” section where all the tools are linked as well as a PDF with the user guide (add link here). Each tool has its own subfolder and does not share any memory space with other tools. All the uploads and downloads are done using .txt files only. All of the tools contain an HTML page with the CSS pages for a minimal styling and the links for all the JavaScript pages relevant to said tool. A list is attached (add link here) with a synopsis of each file.


# Sources
PEG paper
https://ieeexplore.ieee.org/document/1377521

