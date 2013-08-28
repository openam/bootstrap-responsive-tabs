Bootstrap Responsive Tabs
=========================

This uses standard Bootstrap 3.0.0 css and js for the tabs and collapse accordion items. They are regular [tabs](http://getbootstrap.com/javascript/#tabs) at some screen sizes and [collapsible](http://getbootstrap.com/javascript/#collapse) components based on the Bootstrap [Responsive Utilities](http://getbootstrap.com/css/#responsive-utilities), which can be defined by editing one attribute in the javascript file.

Demo
====
To view the demo visit http://openam.github.io/bootstrap-responsive-tabs/

Key features
============
- Uses standard bootstrap tab markup.
- Collapsible component (accordion) is created with jquery.
- Tabs and accordions are accessible via keyboard.
- Supports multiple tab groups on a page, with or without each being responsive.

Notes
=====
- On load the first item in the accordion and tab views are set to active opened. However only the respective set will be show.
- When the window is resized to change from accordion to tabs, the last tab that was opened will be opened even if a different accordion was selected.
- Only tried in Chrome and Firefox, but it should work in IE as well.

How to use
==========
- Include bootstrap css and js.
- Include responsive-tabs.js.
- Setup tabs per the bootstrap documents.
- Add a _responsive_ class to the _ul_ that is used to create the tabs.
- Add a _responsive_ class to the _div_ that is used to create the tab-content.
- Edit the responsive-tabs.js to set where you want to have collapse in place of tabs

>__Note:__ The only difference from the standard bootstrap tab markup to the responsive markup is the addition of the responsive.

```
<ul class="nav nav-tabs responsive" id="myTab">
  <li class="active"><a href="#home">Home</a></li>
  <li><a href="#profile">Profile</a></li>
  <li><a href="#messages">Messages</a></li>
</ul>

<div class="tab-content responsive">
  <div class="tab-pane active" id="home">...content...</div>
  <div class="tab-pane" id="profile">...content...</div>
  <div class="tab-pane" id="messages">...content...</div>
</div>
```
