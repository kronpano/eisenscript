
var code = {
    'saturn' :
        '1 * { y -.5 } 1 * { s 8 y 0.08  color #e0e0e0  } sphere\n'+
        '1 * { y -.4 rz 20 } 36 * { ry 10 } 1 * { x 4.2 s 0.3 } R1\n'+
        '\n'+
        'rule R1 {\n'+
        '  \n'+
        '  1 * { x 1 } 1 * { y 2 } 3 * { z 1 } sph\n'+
        '  1 * { x 2 } 3 * { y 1 } 3 * { z 1 } sph\n'+
        '  1 * { x 3 } 1 * { y 2 } 0 * { z 1 } sph\n'+
        '}\n'+
        '\n'+
        'rule sph {\n'+
        '  { s 0.8 color random } sphere\n'+
        '}\n'+
        '\n'+
        'rule sph {\n'+
        '  { s 0.6 color random  } sphere\n'+
        '}\n'+
        '\n'+
        'rule sph {\n'+
        '  { s 0.4 color random  } sphere\n'+
        '}\n'+
        '\n'+
        'rule sph {\n'+
        '  \n'+
        '}',
        
    'sakura' : 
        'set background #484\n'+
        '\n'+
        '{ rx -90 } sakura\n'+
        '\n'+
        'rule sakura {\n'+
        '  6 * { rz 60 } petal\n'+
        '  { s 2 color #c10020 } sphere\n'+
        '}\n'+
        '\n'+
        'rule petal {\n'+
        '  1 * {  y 0.8 s 1 0.25 1 } 60 * { rx 0.1 y 0.1 s 1.01 } bbox\n'+
        '}\n'+
        '\n'+
        'rule bbox {\n'+
        '  { s 1 0.1 0.1 color #ce97b6  } box\n'+
        '}\n',
    
    'spirals':
        '//\n'+
        '// written by Marc Duiker | www.underexposed.nl\n'+
        '// http://www.flickr.com/photos/marcduiker/4437996282/in/pool-483521@N21/\n'+
        '//\n'+
        '\n'+
        'set background #000\n'+
        'set maxdepth 40\n'+
        'set maxobjects 10000\n'+
        '4 * { ry 90 color #EEE} R0\n'+
        '\n'+
        'rule R0\n'+
        '{\n'+
        'box\n'+
        '{ x 0.99 s 0.9 rx 5 ry 15 rz -10} R0\n'+
        'R1\n'+
        '}\n'+
        '\n'+
        'rule R0\n'+
        '{\n'+
        'box\n'+
        '{ x 0.99 s 0.9 rx 1 ry 15 rz -5} R0\n'+
        'R1\n'+
        '}\n'+
        '\n'+
        'rule R1\n'+
        '{\n'+
        'box\n'+
        '{ y 0.7 s 0.9 rz -15 rx 15 } R1\n'+
        '}\n'+
        '\n'+
        'rule R1\n'+
        '{\n'+
        'box\n'+
        '{ y 0.7 s 0.9 rz 15 rx -15} R1\n'+
        '}\n'+
        '\n'+
        'rule R1\n'+
        '{\n'+
        'box\n'+
        '{ y 0.7 s 0.9 rz 15 rx -15} R1\n'+
        '}\n'+
        '\n'+
        'rule R1\n'+
        '{\n'+
        'box\n'+
        '{ y 0.7 s 0.9 ry -5 rz -15 rx -15} R1\n'+
        '}\n'+
        '\n'+
        'rule R1\n'+
        '{\n'+
        'box\n'+
        '{ y 0.7 s 0.9 ry -5 rz 15 rx -15} R1\n'+
        '}\n',
    
    'BubbleBranching':
        '/*\n'+
        '  Beddards Bubble Branching\n'+
        '  2011-06-26 by Jedidiah Hurt\n'+
        '*/\n'+
        '\n'+
        '{ sat 0 b 100 } bubble\n'+
        '{ s 50 0.01 50 y -118 sat 0 b 100 } box\n'+
        '\n'+
        'rule bubble md 6 {\n'+
        '  sphere\n'+
        '\n'+
        '  { s 0.6 ry 22 x 0.8 y -0.8 } bubble\n'+
        '  { s 0.6 ry 165 x 0.8 y -0.8 } bubble \n'+
        '  { s 0.6 ry 285 x 0.8  y -0.8 } bubble\n'+
        '}\n',
        
    'alien':
        '/*\n'+
        '@author nicolas barradeau\n'+
        '*/\n'+
        'set background #FFFFFF\n'+
        'set maxobjects  5400\n'+
        '\n'+
        '//ground\n'+
        '{ s 100 0.01 100 y -10 color #FFF }box\n'+
        '\n'+
        '40 * {   y 0.1 ry 9 rz -2 s 1.01 1.01 1.01 color #f00  }column\n'+
        '\n'+
        'rule column w 0.5\n'+
        '{\n'+
        '  { y 0.5 ry 18   blend #ff0 0.1 }box\n'+
        '}\n'+
        'rule column w 0.2\n'+
        '{\n'+
        '  { x -0.25 z -0.25 y 0.5 s 0.8  blend #ff0 0.1 } box\n'+
        '}\n'+
        'rule column w 0.2\n'+
        '{\n'+
        '  20 * { rx 1 ry 1.5 rz 3 s 0.75 0.95 1.10 color #ff0 }box\n'+
        '}\n',
    
    'nabla':
        'set seed 57\n'+
        'set maxdepth 10\n'+
        '\n'+
        '1 * { x -2 y -6 } 10 * { x 4 } 10 * { y 4 } 1 * { ry -90 b 0.2 } R1\n'+
        '\n'+
        'rule R1 {\n'+
        '  dbox { z 0.6 rx 5 } R1 \n'+
        '}\n'+
        '\n'+
        'rule R1 { \n'+
        '  dbox { z 0.5 rx -90 } R1 \n'+
        '}\n'+
        '\n'+
        'rule R1 { \n'+
        '  dbox { z 0.6 rz 90 } R1 \n'+
        '}\n'+
        '\n'+
        'rule R1 { \n'+
        '  dbox { z 0.6 rz -90 } R1 \n'+
        '}\n'+
        '\n'+
        'rule R1 weight 0.01 { \n'+
        '}\n'+
        '\n'+
        'rule dbox { \n'+
        '  { color random s 2 2 0.5 } box \n'+
        '}\n'+
        '\n'+
        'rule dbox weight 0.5 {\n'+
        '  { ry 90 s 0.5 1 1 } R1 \n'+
        '}\n'+
        '\n'+
        'rule dbox weight 0.5 {\n'+
        ' { rx 90 s 0.5 2 1 } R1 \n'+
        '}\n',
    
    'milkcrown' : 
        '1 * { z 4 y -3 } 72 * { x 0.3 ry 5 } petal\n'+
        '\n'+
        'rule petal {\n'+
        '  22 * { y 0.6 rx 3 s 0.88 } 1 * { s 1 1 0.1 color #fff  } box\n'+
        '  { y 4.6 z 2 s 0.2 color #fff } sphere\n'+
        '}\n'+
        '\n'+
        '{ s 600 0.1 600 color #e0e0e0 } box\n'+
        '\n'
};
