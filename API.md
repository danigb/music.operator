# API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="add"><span class="type-signature"></span>add<span class="signature">(first, second)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Add two pitches. Can be used to tranpose pitches.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>first</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>first pitch</p></td>
</tr>
<tr>
<td class="name"><code>second</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>second pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L173">lineno 173</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>both pitches added</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.add([3, 0, 0], [4, 0, 0]) // => [0, 0, 1]</code></pre>
</dd>
<dt>
<h4 class="name" id="compare"><span class="type-signature"></span>compare<span class="signature">(first, second)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Compare the height of two pitches. Can be used as comparator for array.sort()
to sort in ascending height (pitch, freq) order</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>first</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>first pitch</p></td>
</tr>
<tr>
<td class="name"><code>second</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>second pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L94">lineno 94</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>0 if same height, &gt; 0 if first is higher, &lt; 0 if second is higher</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>arrayOfPitches.sort(op.compare) // => array in ascending order</code></pre>
</dd>
<dt>
<h4 class="name" id="fifths"><span class="type-signature"></span>fifths<span class="signature">(apitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a pitch or interval measured in fifths and octaves</p>
<p>Every interval (or pitch) can be expressed by repeating compare or descending
fifths and octaves. For exaple, interval major second is two fifths up and
one octave down:
<code>fifths([1, 0, 0]) // =&gt; [2, -1]</code></p>
<p>This representation is useful for calculating interval distances, transpositions
or keys</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>apitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval as <a href="https://github.com/danigb/a-pitch">a-pitch</a></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L113">lineno 113</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>an array with the form [fifths, octaves] where both are integers</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>var fifths = require('pitch-fifths')
fifths([0, 0, 0]) // => [0, 0]
fifths([0, 0, 1]) // => [0, 1]
fifths([1, 0, 0]) // => [2, -1]</code></pre>
</dd>
<dt>
<h4 class="name" id="multiply"><span class="type-signature"></span>multiply<span class="signature">(n, a)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Multiply a pitch or interval by a scalar</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>n</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the scalar</p></td>
</tr>
<tr>
<td class="name"><code>a</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L210">lineno 210</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch or interval multiplied in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.multiply(2, [4, 0, 0]) // => [1, 0, 1]</code></pre>
</dd>
<dt>
<h4 class="name" id="pitchClass"><span class="type-signature"></span>pitchClass<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get pitch class of a pitch.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L5">lineno 5</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch class of the pitch</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitchClass([1, -2, 3]) // => [1, -2, nul]</code></pre>
</dd>
<dt>
<h4 class="name" id="semitones"><span class="type-signature"></span>semitones<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get distance in semitones from <code>[0, 0, 0]</code> (<code>'C0'</code> or <code>'1P'</code>)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L80">lineno 80</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the distance</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>op.semitones([1, 1, 0]) // => 3
op.semitones([0, 0, 0]) // => 0</code></pre>
</dd>
<dt>
<h4 class="name" id="setDefaultOctave"><span class="type-signature"></span>setDefaultOctave<span class="signature">(octave, pitch)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Set the octave only if not present</p>
<p>This function can be partially applied (Integer -&gt; Array -&gt; Array)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>octave</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the octave number</p></td>
</tr>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L55">lineno 55</a>
</li>
</ul></dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>op.setDefaultOctave(1, [1, 2, null]) // => [1, 2, 1]
op.setDefaultOctave(1, [1, 2, 3]) // => [1, 2, 3]
// partially applied:
arrayOfPitches.map(op.setDefaultOctave(3))</code></pre>
</dd>
<dt>
<h4 class="name" id="setOctave"><span class="type-signature"></span>setOctave<span class="signature">(octave, pitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Set octave of a pitch.</p>
<p>This function can be partially applied (Integer -&gt; Array -&gt; Array)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>octave</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the octave to set</p></td>
</tr>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L18">lineno 18</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch with the given octave</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.setOctave(2, [1, 2, 0]) // => [1, 2, 2]
// partially applied, you get a function:
arrayOfPitchs.map(operator.setOctave(2))</code></pre>
</dd>
<dt>
<h4 class="name" id="simplify"><span class="type-signature"></span>simplify<span class="signature">(interval)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Simplify interval (set the octave to 0)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the interval</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L42">lineno 42</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the simplified interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.simplify([1, 2, 3]) // => [1, 2, 0]</code></pre>
</dd>
<dt>
<h4 class="name" id="subtract"><span class="type-signature"></span>subtract<span class="signature">(a, b)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Subtract two pitches or intervals. Can be used to find the distance between pitches.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>a</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>one pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
<tr>
<td class="name"><code>b</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the other pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.operator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.operator/blob/master/index.js#L188">lineno 188</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>both pitches or intervals substracted <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.subtract([4, 0, 0], [3, 0, 0]) // => [1, 0, 0]</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->