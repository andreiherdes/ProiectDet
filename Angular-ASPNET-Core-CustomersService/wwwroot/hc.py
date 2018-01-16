#!/usr/bin/env python
# encoding: utf-8

import sys
import os
import towers
import functools
import time
from collections import deque
from copy import deepcopy
from copy import copy



def prune_children(children, open_states, closed):
	for child in children[:]:
		if open_states:
			for state in open_states:
				if child.equal(state):
					children.remove(child)
		if closed:
			for state in closed:
				if child.equal(state):
					children.remove(child)
	return children
	

def hc():
	"""non recursive depth first search on a game state"""
	start = towers.towers()
	print("starting state:")
	start.toString()
	print ("")
	moves = []
	closed = list()
	current_node = start
	while current_node != None:
		if current_node.solved():
			return current_node
		else:
			successors = []
			next_eval = -1
			next_node = None
			current_node.generateMoves
			moves = current_node.validMoves
			closed.append(current_node)
			print('*****level :',current_node.steps)
			print(current_node.toString())
			print('options: ')
			for move in moves:
				Y = deepcopy(current_node)
				Y.move(move)
				successors.append(Y)
			successors = prune_children(successors,[],closed)
			for suc in successors:
				if(suc.calcheur()>next_eval):
					next_eval = suc.calcheur()
					next_node = suc
				print(suc.toString(),'HEUR',suc.heur)
			current_node = next_node


def main():
	file = open('hc.txt','w')
	sum = 0
	times = 30 

	for i in range(0,times):
		start_time = time.time()
		solved = hc()
		end_time = time.time()
		if not solved:
			print('fail')
		else:
			print ("End State:")
			solved.toString()
			print ("Complete! solved in %d steps!" % solved.steps)
			print ("Steps used to complete are as follows:")
			print (solved.path)
		elapsed = 1000*(end_time-start_time)
		sum += elapsed
		file.write(str(i+1) + ": " + str(elapsed) + '\n')
		print(elapsed,'ms')
		print('iter no', i+1)
		i += 1
	file.write('average: ' + str(sum/times) + '\navg steps: fails')
	file.close()

if __name__ == '__main__':
	main()

