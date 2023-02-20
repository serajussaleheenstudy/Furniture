import React from "react";
import useTitle from "../../hooks/useTitle";

const BLogs = () => {
  useTitle("Blogs");
  return (
    <div className="mt-16 mb-10">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">Blogs</p>
        <h2 className="text-5xl font-semibold">Learn With Blog </h2>
      </div>

      <div className="flex justify-center bg-base-200 rounded-lg my-10">
        <div className="my-10 w-11/12">
          <div className="grid grid-cols-1 gap-4">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100"
            >
              <div className="collapse-title text-xl font-medium bg-primary dark:text-black">
                What are the different ways to manage a state in a React
                application?
              </div>
              <div className="collapse-content">
                <p>
                  There are four main types of state you need to properly manage
                  in your React apps: <br />
                  {`
                    

1. Local state:
Local state is most often managed in React using the useState hook.
For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form's inputs.
2. Global state:
Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.
3. Server state
Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.
4. URL state:
URL state is often missing as a category of state, but it is an important one.
In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
                    `}
                </p>
              </div>
            </div>
            <div
              tabIndex={1}
              className="collapse collapse-arrow border border-base-300 bg-base-100"
            >
              <div className="collapse-title text-xl font-medium bg-primary dark:text-black">
                How does prototypical inheritance work?
              </div>
              <div className="collapse-content">
                <p>
                  {`
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                    `}
                </p>
              </div>
            </div>
            <div
              tabIndex={2}
              className="collapse collapse-arrow border border-base-300 bg-base-100"
            >
              <div className="collapse-title text-xl font-medium bg-primary dark:text-black">
                What is a unit test? Why should we write unit tests?
              </div>
              <div className="collapse-content">
                <p>
                  {`Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.`}
                </p>
              </div>
            </div>
            <div
              tabIndex={3}
              className="collapse collapse-arrow border border-base-300 bg-base-100"
            >
              <div className="collapse-title text-xl font-medium bg-primary dark:text-black">
                React vs. Angular vs. Vue?
              </div>
              <div className="collapse-content">
                <p>
                  {`
                    1. Angular:

MVC framework
Angular is a MVW (Model-View-Whatever) framework, traditionally used as an MVC (Model-View-Controller). Due to this, the application is divided into three interconnected components. This enables Angular JS developers to write well-structured code, which is beneficial for complex projects.

Angular templates
The templates for component creation are readable because they mostly use standard HTML tags.
Simple implementation of two-way data binding. Two-way data binding means that any changes to the model affect the view. Vice versa when the view changes, model immediately changes as well. Angular allows simple two-way data binding, which is beneficial for simple applications. More complex apps work more quickly with one-way data binding, which works only in one direction (view-to-model or model-to-view), depending on the needs of the software. This allows resources to be saved.

2. React:
Component model
React doesn’t use any templates. The component logic is written in JavaScript, giving it more flexibility and enabling large amounts of data to easily pass through your app, while maintaining the state of the DOM. Although this approach is used in every compared frontend frameworks, React was the first one to introduce a component model.

Virtual DOM
As explained, a virtual DOM enables a simplified copy of the DOM to be created. All changes that need to be implemented are made in the virtual DOM. Later, the two DOMs are compared and, when the differences are identified, the real DOM will re-render only the changed part. This process is much faster and more efficient than working directly with the DOM.

One-way data binding
Two-way data binding was an advantage for Angular, and React’s one-way data binding may be an advantage as well. This approach makes the view react to any changes made to the model, but the changes in the view itself cannot affect the model. As a result, the data only flows in one direction, reducing the possibility of any side effects.

Usage of pure functions
Unlike Angular, React doesn’t require you to use classes. Your application UI can be created using pure functions, simplifying the codebase. 
                    
                    3.Vue:
                    MVC framework
Just like Angular, Vue is an MVC (or Model-View-Controller) framework. The advantage of this is obvious – it allows  you to write well-structured code, which is extremely important when developing complex applications.

Lightweight solution
One significant advantage of Vue is the small framework size as it doesn’t include many features right “out the box”, but the functionality is easily extended with a variety of third-party solutions. It is often compared with Angular, which is a monolithic framework that has a bunch of built-in features that are unlikely to be used in your app at all. Of course, tree-shaking allows you to eliminate unused code, but the framework size is still larger compared to what Vue offers. A full-featured Vue.js project with Vuex + vue-router weighs ~30kb gzipped. At the same time, an out-of-the-box, AOT-compiled application generated using angular-cli has a size of ~130kb gzipped. Its compact size and ability to include third-party modules to extend the functionality make Vue.js a wiser choice for those who care about reducing size, and therefore, improving the speed of the web app.

Declarative templates
Templates in Vue.js are written in HTML, making them readable without knowledge of other programming languages.

Virtual DOM
Due to a lighter-weight virtual DOM implementation, apps built with Vue.js have the highest performance compared with other frontend frameworks.

Two-way data binding
Vue.js automatically syncs the whole model with the DOM. `}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLogs;
