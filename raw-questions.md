1.   Is Javascript single-threaded?

2.   Different data types in Javascript?

3.   Different ways to create an Object in Javascript?

4.   What is rest and spread operator?

5.   What is a higher-order function?

6.   What is a Temporal dead zone?

7.   What is the difference between Call, Apply, and Bind methods?

8.   What are the features of ES6?

9.   What is the Factory function, Iterators and generator function?

10.  How to make an object immutable? (seal and freeze methods)?

11.  What is Event delegation?

12.  What are server-sent events?

13.  What is a web worker or Web API or service worker in javascript?

14.  What is TypeScript?

15.  What is explicit and implicit type assignment?

16.  Difference between any, unknown and never in TypeScript?

17.  How do you give the type of Arrays?

18.  What is Type Inference in array?

19.  What are tuples?

20.  What are readonly tuples?

21.  How to give the types for Objects?

22.  How to have optional properties in Objects?

23.  Explain enum in TypeScript?

24.  What is String enum?

25.  What are Type Aliases?

26.  What are interfaces?

27.  How to extend interfaces?

28.  What are Union types?

29.  How to give the return type in function?

30.  How to give type of parameters in function?

31.  How to give optional, default and rest parameters in function?

32.  What is casting in TypeScript?

33.  How to give type of a variable in Class?

34.  What is public, private and protected in TypeScript classes?

35.  What is the readonly keyword in reference to classes in TypeScript?

36.  How to implement overriding in classes of TypeScript?

37.  What are Abstract classes?

38.  What are Singleton classes.

39.  What are Generics in TypeScript. Give examples in functions, classes and type aliases.

40.  What is Partial, utility type.

41.  What is Required, utility type.

42.  What is Record, utility type.

43.  What is Omit, utility type.

44.  What is Pick, utility type.

45.  What is Exclude, utility type.

46.  What is Readonly, utility type.

47.  Consider the following JavaScript code and determine what the output will be, with an explanation.

     ```js
     function Foo() {
       this.value = 42;
     }

     Foo.prototype.getValue = function () {
       return this.value;
     };

     const obj1 = new Foo();
     const obj2 = {
       value: 24,
       getValue: obj1.getValue,
     };

     console.log(obj1.getValue()); // A
     console.log(obj2.getValue()); // B

     setTimeout(function () {
       console.log(obj1.getValue()); // C
       obj2.value = 100;
       console.log(obj2.getValue()); // D
     }, 0);

     Promise.resolve().then(() => {
       obj1.value = 84;
       console.log(obj1.getValue()); // E
     });

     console.log(obj1.getValue()); // F
     ```

     What will be printed at lines A, B, C, D, E, and F?

48.  Explain how each output is determined, considering JavaScript’s event loop and `this` binding.

49.  What will be the output of this code, and why?

     ```js
     function mysteryFunction(a) {
       let result = 0;
       for (let i = 0; i < a.length; i++) {
         result += a[i] % 2 === 0 ? a[i] : 0;
       }
       return result;
     }

     console.log(mysteryFunction([1, 2, 3, 4, 5]));
     ```

50.  Given the box1, what is the width of box1 (including border and padding)?

     ```html
     <html>
       <head>
         <meta name="viweport" />
         <style>
           .box {
             width: 240px;
             border: 10px;
             padding: 20px;
           }
           @media (min-width: 600px) {
             box1 {
               width: 180px;
             }
           }
           @media (max-width: 600px) {
             box1 {
               width: 260px;
             }
           }
         </style>
       </head>
       <body>
         <div id="box1" class="box"></div>
         <div id="box2" class="box"></div>
         <div id="box3" class="box"></div>
       </body>
     </html>
     ```

51.  What will be the width of box1 if the padding and border are reduced?

52.  What will be the width of box1 if the screen size is less than 600px?

53.  What will be the width of box1 if the screen size is greater than 600px?

54.  What does `<meta name="viewport" />` mean?

55.  How will you optimize the following code? It gets an array of strings that contain numbers and should return an array of unique numbers.

     ```js
     let res = [];
     let numsArray = ["123", "546", "1", "2002", "1365", "1", "2002", "300"];
     let pattern = "[^0-9]";
     for (var num of numsArray) {
       if (pattern.test(num) {
         numsArray.push(num);
       }
     }
     ```

56.  You are given two input boxes, First Name and Last Name, and a Submit button. If the user leaves First Name or Last Name empty and clicks Submit, show “Invalid Input” under that input. The message and the input border should be red. If the inputs are valid, append the name to a list. If the user already exists, show “User already exists” in red.

57.  Given products and special offers, build a page that lists Black Friday products in decreasing order by total product count, showing each product’s title and price. Expected order: Boots $11, T-Shirt $35, Chess Board $19, 1984 $22.

     ```js
     async function displayBlackFridayProducts() {
       const { products, offers } = await getProductsAndDeals();
     }

     displayBlackFridayProducts();

     function getProductsAndDeals() {
       return new Promise((resolve, reject) => {
         resolve({
           products: [
             {
               id: "product_1",
               title: "Baker",
               category: "kitchen",
               price: 12,
               discount: 0,
               count: { warehouse: 2, store: 3, reserve: 5 },
             },
             {
               id: "product_2",
               title: "1984",
               category: "books",
               discount: 22,
               price: 22,
               count: { warehouse: 2 },
             },
             {
               id: "product_3",
               title: "T-Shirt",
               category: "clothing",
               discount: 5,
               price: 35,
               count: { store: 3, reserve: 5 },
             },
             {
               id: "product_4",
               title: "Boots",
               category: "clothing",
               discount: 34,
               price: 11,
               count: { warehouse: 6, store: 1, reserve: 3 },
             },
             {
               id: "product_5",
               title: "Chess Board",
               category: "games",
               discount: 0,
               price: 19,
               count: { warehouse: 2, store: 3 },
             },
             {
               id: "product_6",
               title: "Fifa 2023",
               category: "games",
               price: 64,
               discount: 12,
               count: { warehouse: 2, store: 3, reserve: 5 },
             },
             {
               id: "product_7",
               title: "God of War",
               category: "games",
               discount: 22,
               price: 44,
               count: { warehouse: 2, store: 3, reserve: 5 },
             },
           ],
           offers: [
             { id: "offer_1", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
             { id: "offer_2", title: "Black Friday Deals", code: "BF_2023", product: "product_2" },
             { id: "offer_3", title: "Black Friday Deals", code: "BF_2023", product: "product_4" },
             { id: "offer_4", title: "Christmas Deals", code: "CH_2023", product: "product_1" },
             { id: "offer_5", title: "Black Friday Deals", code: "BF_2023", product: "product_3" },
             { id: "offer_6", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
             { id: "offer_7", title: "Cyber Monday Deals", code: "CM_2023", product: "product_7" },
             { id: "offer_8", title: "Cyber Monday Deals", code: "CM_2023", product: "product_5" },
           ],
         });
       });
     }
     ```

58.  Design an accordion collapse component using plain JavaScript.

59.  Design a data table component with search. Requirements: add rows dynamically; store rows in local storage and restore them on refresh; debounce the search phrase; filter rows when the phrase matches any column.

60.  What would you have done better?

61.  What would you do if you were in the same situation again?

62.  What did you learn in the process?

63.  How did it impact your productivity?

64.  When was the last time you took ownership or did a deep dive into a problem?

65.  Design a file-system UI on the web (any framework). Use a recursive component, props, events, and parent-child data flow.

66.  Build a responsive layout with CSS Grid and Flexbox that adapts across screen sizes.

67.  Build a dynamic React form whose fields change based on user input (a dropdown that reveals related fields).

68.  How would you fetch and display data asynchronously with Axios in React, including loading states, errors, parallel requests, and retries after network failures?

69.  Design a scalable admin dashboard for monitoring cloud infrastructure, with real-time updates from multiple sources.

70.  How would you cache frequently accessed data on the client in a single-page app?

71.  How would you improve SEO for a React single-page app?

72.  Describe a time you shipped a feature under a tight deadline.

73.  How do you keep up with frontend trends?

74.  Where do you see yourself in five years?

75.  Write code for an HTTP interceptor and for auth guards.

76.  Where do you use the observer pattern in frontend development?

77.  How do you validate a form that sends file data?

78.  Explain the Context API, and how you use it to share state across components.

79.  What is the difference between the Shadow DOM and the Virtual DOM?

80.  Write a function that checks whether a string is a palindrome, ignoring characters that are not letters or digits.

81.  Given an array of integers, find every pair that sums to a target.

82.  Design a responsive dashboard component that renders dynamic data and handles user interaction. Cover state with React hooks, rendering large datasets, lazy loading, debugging, performance bottlenecks, and cross-browser behavior.

83.  Design a simple file-sharing app, including the UI components, upload progress, API integration, errors, and retries. Halfway through, switch the design to mobile-first.

84.  Describe a time a project you worked on failed, and how you handled it.

85.  What is JSX, and why is it used in React?

86.  What are components in React?

87.  What is the difference between state and props?

88.  What does this print?

     ```js
     let str = "medium";
     str[0] = "k";
     console.log(str);
     ```

89.  What does this print?

     ```js
     console.log(0.1 + 0.2 == 0.3);
     ```

90.  What does this print?

     ```js
     (function () {
       var x = (y = 3);
     })();

     console.log(typeof x !== "undefined");
     console.log(typeof y !== "undefined");
     ```

91.  What does this print?

     ```js
     let arr = [1, 2, 3];
     arr[10] = 99;
     console.log(arr.length);
     console.log(arr);
     ```

92.  What does this print?

     ```js
     const a = {};
     const b = { key: "b" };
     const c = { key: "c" };
     a[b] = 123;
     a[c] = 456;
     console.log(a[b]);
     ```

93.  What does this print? How would you change the loop so it prints 0 through 4?

     ```js
     for (var i = 0; i < 5; i++) {
       setTimeout(() => console.log(i), i * 1000);
     }
     ```

94.  Add the numbers in an array without loops and without array methods.

95.  What does this print?

     ```js
     var foo = function bar() {
       return 1;
     };

     console.log(typeof bar);
     ```

96.  What does this print?

     ```js
     let x = 10;
     let y = (x++, x + 1);
     console.log(y);
     ```

97.  What does this print?

     ```js
     console.log(1 < 2 < 3);
     console.log(3 > 2 > 1);
     ```

98.  What does this print?

     ```js
     const a = [1, 2, 3];
     const b = [1, 2, 3];
     const c = "1,2,3";

     console.log(a == c);
     console.log(b == c);
     console.log(a == b);
     ```

99.  For an array such as `[2, 7, 4, 5, 9, 10, 8]`, sum the values at even positions and the values at odd positions, and return the greater sum. In the article’s example, even positions are 7, 5, and 10, and odd positions are 2, 4, 9, and 8.

100. Remove every number that appears more than once. `[1, 2, 3, 3, 4, 4, 5]` should become `[1, 2, 5]`.

101. Write a function that counts how many times each character appears in a string.

102. Why do you want to work at Stripe?

103. What do you know about Stripe’s products?

104. What is your experience with React and modern frontend development?

105. Build a searchable dropdown in React that fetches and filters API results as the user types. Also debounce the search, and handle an empty result list and API errors.

106. Design a notification center for Stripe’s dashboard. It needs several kinds of notices (errors, updates, payment alerts), live updates over WebSockets, and user filters. Talk through Redux versus Context, caching recent notices, responsiveness, and accessibility.

107. Pagination is wrong. Find the bug and fix it.

108. Describe a hard project and how you got past the obstacles.

109. How do you handle a disagreement on a team?

110. How do you learn a new technology?

111. You notice a wasteful part of Stripe’s frontend architecture. How would you bring it up?

112. The team is behind on a critical feature. How would you handle that?

113. One implementation attaches a new arrow function as a click listener every time. The other uses a named function with a stable reference. Which one performs better, and why?

114. Why can’t you remove that arrow-function listener with `removeEventListener`?

115. Find the union and the intersection of two sorted arrays. Example: `[1, 3, 4, 6, 7]` and `[2, 3, 4, 5]`.

116. Given votes such as `['a', 'a', 'b', 'b', 'a', 'b', 'c']`, return the candidate with the most votes. If there is a tie, the one who appears first wins.

117. What does this print?

    ```js

    let obj1 = {};
    let obj2 = {};
    console.log(obj1 == obj2);
    console.log(obj1 === obj2);
    ```

118. What does this print?

    ```js
    console.log("a");

    setTimeout(() => {
      console.log("b");
    }, 0);

    const promise = new Promise((resolve) => {
      console.log("e");
      resolve("c");
    });

    promise.then((result) => {
      console.log(result);
    });

    console.log("d");
    ```

119. Fetch data from an API and handle a null or empty response, a loading state, and errors.

120. How do you manage state in a large app?

121. What is a micro-frontend, and when would you use one?

122. Build a simple restaurant listing: infinite scroll, cuisine and rating filters, a responsive layout, and unit tests.

123. Design the frontend for an order-tracking screen with live updates, offline support, and many concurrent users.

124. Describe a project you owned from start to finish.

125. When did you pick a simpler library instead of a popular one, and why?

126. Where do you want your career to go?

127. What is the difference between `var`, `let`, and `const`?

128. How do you debug JavaScript?

129. What is the difference between `==` and `===`?

130. What are the SOLID principles?

131. Why does the Single Responsibility Principle matter?

132. How do you apply the Open/Closed Principle in JavaScript?

133. What does the Liskov Substitution Principle mean in practice?

134. How does Interface Segregation apply in JavaScript, which has no formal interfaces?

135. What is the Dependency Inversion Principle, and how do you use it in JavaScript?

136. Give a real example of SOLID in JavaScript.

137. How do you use object-oriented programming in JavaScript?

138. What is `srcset` in HTML?

139. What is the difference between `display: none` and `visibility: hidden`?

140. With vanilla JavaScript, make two nested boxes, then hide the inner box with CSS only.

141. How do you improve frontend performance?

142. What does the `new` operator do?

143. Can you bind `this` on an arrow function? What happens if you call an arrow function with `new`?

144. Find the nth largest number in an array.

145. What does this print?

    ```js

    console.log(a);
    var a = 10;
    ```

146. What does this print?

    ```js
    console.log(b);
    let b = 10;
    ```

147. What does this print?

    ```js
    foo();
    function foo() {
      console.log("Hello");
    }
    ```

148. What does this print?

    ```js
    bar();
    var bar = function () {
      console.log("Hi");
    };
    ```

149. What does each call return?

    ```js
    const obj = {
      name: "JS",
      regular: function () {
        return this.name;
      },
      arrow: () => {
        return this.name;
      },
    };

    console.log(obj.regular());
    console.log(obj.arrow());
    ```

150. What does this print?

    ```js
    for (let i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1000);
    }
    ```

151. What does `typeof null` print?

152. What does this print?

    ```js

    console.log(0 == "0");
    console.log(0 === "0");
    ```

153. What does this print?

    ```js
    const a = {};
    const b = {};
    a[b] = "hello";
    console.log(a[b]);
    ```

154. What does this print?

    ```js
    console.log([] + []);
    console.log([] + {});
    console.log({} + []);
    ```

155. What does this print, and in what order?

    ```js
    console.log("start");
    setTimeout(() => console.log("timeout"), 0);
    Promise.resolve().then(() => console.log("promise"));
    console.log("end");
    ```

156. What does this print?

    ```js
    let x = 5;
    function test() {
      let x = 10;
      console.log(x);
    }
    test();
    console.log(x);
    ```

157. What does this print?

    ```js
    let obj1 = { name: "A" };
    let obj2 = obj1;
    obj2.name = "B";
    console.log(obj1.name);
    ```

158. What do the two calls print?

    ```js
    function outer() {
      let count = 0;
      return function () {
        count++;
        console.log(count);
      };
    }

    const counter = outer();
    counter();
    counter();
    ```

159. What does this print?

    ```js
    (function () {
      var x = (y = 5);
    })();

    console.log(typeof x);
    console.log(typeof y);
    ```

160. What does this print?

    ```js
    function foo(a, b) {
      arguments[0] = 99;
      console.log(a);
    }

    foo(1, 2);
    ```

161. What does this print?

    ```js
    const [a = 1, b = 2] = [undefined, null];
    console.log(a, b);
    ```

162. What does this print?

    ```js
    const arr = [1, , 3];
    console.log(arr.length);
    console.log(arr[1]);
    ```

163. What does this print?

    ```js
    const person = {
      name: "Alice",
      greet: function () {
        setTimeout(function () {
          console.log(this.name);
        }, 1000);
      },
    };

    person.greet();
    ```

164. What does this print?

    ```js
    const obj = Object.freeze({ name: "Test" });
    obj.name = "Changed";
    console.log(obj.name);
    ```

165. What does this print?

    ```js
    const { a, b } = { b: 1, a: 2 };
    console.log(a, b);
    ```

166. What does this print?

    ```js
    const arr = [1, 2, 3];
    const copy = [...arr];
    copy[0] = 9;
    console.log(arr[0]);
    ```

167. What does `NaN === NaN` print?

168. What does `typeof function () {}` print?

169. Turn the Figma designs into a working, responsive landing page. The page is what a user sees after clicking a social sign-up ad for Loch. It has a sign-up section and several carousels.

170. Write `fetchKeys`. It walks a nested object or array and returns every path that points at a primitive.

    `{ a: { b: { c: 1 }, d: 2 }, e: 3 }` → `["a.b.c", "a.d", "e"]`

    `[1, { a: 2, b: [3, 4] }, 5]` → `["0", "1.a", "1.b.0", "1.b.1", "2"]`

171. Write `processDomainOperation(operations)`. Each row is an operation with up to three strings: the op, a domain, and an IP.

    - `PUT` stores a domain and its IP.
    - `GET` returns that IP, or `"404"` if the domain is missing.
    - `COUNT` counts domains that equal the query or end with `"." + query`.

    Sample input:

    ```js
    [
      ["PUT", "www.apple.com", "10.20.30.40"],
      ["PUT", "jobs.apple.com", "10.20.30.50"],
      ["PUT", "sites.google.com", "142.258.145.693"],
      ["GET", "sample.com"],
      ["GET", "www.apple.com"],
      ["COUNT", "apple.com"],
      ["COUNT", "com"],
    ]
    ```

    Expected output: `["404", "10.20.30.40", "2", "3"]`

172. What does this print?

    ```js
    const p = new Promise((resolve) => {
      console.log("1");
      setTimeout(() => {
        resolve();
      });
    });

    Promise.resolve().then(() => console.log("2"));
    setTimeout(() => console.log("3"));
    p.then(() => console.log("4"));
    setTimeout(() => console.log("5"));
    ```

173. What do the two logs show?

    ```js
    let person1 = {
      name: "Anil Kumar",
      address: { line1: "Patna", line2: "Bihar" },
    };

    let person2 = { ...person1 };
    person1.name = "Ravi Kumar";
    person1.address.line1 = "Hyderabad";

    console.log(person1);
    console.log(person2);
    ```

174. A promise chain mixes `.then()` and `.finally()`, and the promise both rejects and resolves, but only one of those settles it. What runs, and when does `.finally()` run?

175. What does this print?

    ```js

    const shape = {
      radius: 10,
      diameter() {
        return this.radius * 2;
      },
      perimeter: () => 2 * Math.PI * this.radius,
    };

    console.log(shape.diameter());
    console.log(shape.perimeter());
    ```

176. What does this print?

    ```js
    function foo() {
      const bar = "bar";
      if (true) {
        console.log(bar);
        const bar = "bar1";
      }
    }
    ```

177. Starting from `{ foo: [1], switch: false }`, what is the state after these dispatches? The reducer cases are written `"SET FOO"` and `"PUSH FOO"` (with a space).

    ```js
    dispatch({ type: "SET_FOO", foo: [1, 2] });
    dispatch({ type: "PUSH_FOO", foo: 3 });
    dispatch({ type: "PUSH_FOO", foo: 6 });
    ```

    `SET FOO` replaces `foo` and sets `switch` to `true`. `PUSH FOO` appends to `foo` and flips `switch`.

178. In a function component, load data from the network when the component mounts and show it. You can ignore the case where the component unmounts before the request finishes. How do you do that with hooks?

179. Which of these is true for React context in React 16.3 and later?

    - Context can only be read in class components with `this.context`.

    - A context is created with `React.createContext()`.
    - The only way to read a context in a function component is the `Consumer` component.
    - Context values must be primitive types.

180. Your React app loads fine on desktop, but on mid-range Android phones it takes 10 seconds and people leave. You have 30 minutes. What do you do?

181. Can you diagnose a performance problem that does not show up on your own machine?

182. Can you pick which fixes matter when you are under time pressure?

183. Can you think past the code and into the experience of people on older, weaker devices?

184. What are React portals, and when would you use them?

185. How do you handle authentication and authorization in a React app?

186. What are Suspense and concurrent rendering, and how do they help performance?

187. How do you avoid stale closures in `useEffect`?

188. How would you keep state across page reloads?

189. How does React batch state updates, and when does it not?

190. What does TypeScript buy you on a frontend project?

191. What is the difference between `useEffect` and `useLayoutEffect`?

192. How does the virtual DOM work?

193. How does a browser turn a page into pixels?

194. How do you handle API errors and retries?

195. How do you raise a Lighthouse score?

196. How do you handle environment variables and secrets in the frontend?

197. How do you implement debounce and throttle?

198. What are bubbling and capturing?

199. How does a browser render a page (the critical rendering path)?

200. What are reflow and repaint?

201. How does `async` / `await` work underneath?

202. What is hoisting?

203. What are hooks, and why were they added?

204. What is the difference between `useMemo` and `useCallback`?

205. How would you make a React app faster?

206. How do you design a table that sorts, filters, and paginates?

207. How do you handle errors in a React app?

208. How do you make React components accessible?

209. What React anti-patterns should you avoid?

210. How do you use TypeScript well in React?

211. How would you speed up a large React app (build, runtime, network, and monitoring)?

212. How would you design a frontend architecture that can grow?

213. What is hydration?

214. How would you cache data in a React app?

215. How would you design a progressive web app?

216. How do you integrate APIs without wasting requests?

217. How do you keep a frontend secure?

218. How do you watch and debug performance in production?

219. What are time and space complexity? Give an example.

220. Reverse a string without a built-in reverse.

221. How do you remove duplicates from an array?

222. Find the first character in a string that appears once.

223. What is the difference between synchronous and asynchronous code?

224. Implement throttle.

225. Merge two sorted arrays.

226. Which data structures do you use most in frontend work?

227. How would you implement infinite scroll?

228. How would you write a custom hook that fetches data?

229. How do you approach a frontend system-design question?

230. Design a scalable admin dashboard.

231. Design a frontend for live updates, such as a stock dashboard.

232. Design a system that can show very large tables.

233. How would you implement role-based access?

234. How do you handle environment config and build pipelines?

235. How would you design a multilingual React app?

236. Design a notification system (in-app, toast, and live).

237. How do you observe a frontend (monitoring, logs, analytics)?

238. Explain how React actually works, not just how you use it.

239. When does that matter in day-to-day work?

240. How do you handle shared dependencies and version clashes in a monorepo?

241. What concurrent rendering features did React 18 add?

242. How do you fetch data so it still works as the app grows?

243. Which progressive-web-app features actually bring people back?

244. How do you design layouts that are both responsive and adaptive?

245. How do you work offline and resolve sync conflicts?

246. How do you keep code quality consistent in review?

247. How do you find, track, and shrink technical debt?

248. Explain how React re-renders work.

249. What runs first, `Promise.then` or `setTimeout`?

250. Why does `this` behave differently in arrow functions?

251. Is the DOM part of JavaScript?

252. Why does blocking JavaScript freeze the UI?

253. What is a good way to share dependencies in a monorepo?

254. How do you handle server rendering and hydration in a complex app?

255. Why do React 18's concurrent features matter?

256. How do you fetch data efficiently at scale?

257. How do you design CI/CD for a frontend with several environments?

258. How do you use feature flags in a large React app?

259. How do you monitor errors in production?

260. How do you set up A/B tests in React?

261. Which progressive-web-app features improve the experience?

262. How do you design a layout that works from a phone up to a 4K screen?

263. How do you add offline support and sync data later?

264. How do you run code review so it actually helps?

265. How do you manage technical debt in an old codebase?

266. Write a function that returns `{ a: 1 }`.

267. Rewrite it as an arrow function.

268. An arrow function that only returns a value can drop `return` and the braces, as in `() => 2`. Do the same for an object `{ a: 1 }`. What does this return, and why?

    ```js

    const getObject = () => { a: 1 };
    getObject();
    ```

269. If those braces are a block, why is `a: 1` inside it not a syntax error?

270. What is the difference between `placeholderData` and `initialData` in TanStack Query?

271. How does each one interact with `staleTime`?

272. What does this print, and in what order?

    ```js

    console.log("A");

    setTimeout(() => {
      console.log("B");
      Promise.resolve().then(() => console.log("C"));
    }, 0);

    Promise.resolve().then(() => {
      console.log("D");
      setTimeout(() => console.log("E"), 0);
    });

    console.log("F");
    ```

273. Build a generic Angular list that fetches data and paginates.

274. Next week the user list needs infinite scroll, and another list still needs pages. What breaks if both inherit the same base class?

275. What if one list should not have a loading state?

276. In React for the web, what happens if you pass an array to `style`?

    ```jsx

    const styles = {
      container: { backgroundColor: "blue" },
      text: { color: "white" },
    };

    function Box() {
      return (
        <div style={[styles.container, styles.text]}>Hello World</div>
      );
    }
    ```

    - React merges the objects, like React Native.
    - React throws or ignores the styles, because `style` wants one object.
    - This only works with styled-components or Emotion.
    - React applies only the first object.

277. What shows on the screen?

    ```jsx
    function App() {
      const data = [];
      const var1 = 10;
      const var2 = 0;

      return (
        <div>
          {data.length && <p>Data Loaded</p>}
          {var1 && <p>Var1 is {var1}</p>}
          {var2 && <p>Var2 is {var2}</p>}
        </div>
      );
    }
    ```

    - "Data Loaded", "Var1 is 10", and "Var2 is 0"
    - Only "Var1 is 10"
    - `0`, "Var1 is 10", `0`
    - "Var1 is 10" and "Var2 is 0"

278. Why is this `useEffect` invalid?

    ```jsx
    useEffect(async () => {
      const res = await fetch("https://api.example.com/data");
      const data = await res.json();
      console.log(data);
    }, []);
    ```

    - React forbids `async` / `await` inside `useEffect`.
    - An async function returns a Promise, and `useEffect` wants nothing or a cleanup function.
    - `fetch` cannot run inside `useEffect`.
    - Async functions block rendering.

279. Is using `index` as the key correct here?

    ```jsx
    function WeekDays() {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      return (
        <ul>
          {days.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      );
    }
    ```

    - Index keys always make React faster.
    - Index keys are always wrong.
    - Index keys are safe here because the list never changes order or shape.
    - React throws if the key is an index.

280. Why is this a syntax error?

    ```jsx
    function App() {
      return (
        <h1>Hello</h1>
        <p>Welcome to React</p>
      );
    }
    ```

    - JSX becomes one `React.createElement` call, and a function can return only one value.
    - The DOM needs a single root for the whole document.
    - Components must use `render()` to show more than one element.
    - Browsers cannot parse tags that are not inside a `div`.

281. What happens to focus and the typed value when you click Swap?

    ```jsx
    function App() {
      const [swap, setSwap] = useState(false);

      return (
        <>
          {swap ? (
            <input key="b" placeholder="B" />
          ) : (
            <input key="a" placeholder="A" />
          )}
          <button onClick={() => setSwap((s) => !s)}>Swap</button>
        </>
      );
    }
    ```

    - React sees two `input`s in the same place and keeps state and focus.
    - The `key` changed, so React throws away the old input and makes a new one.
    - Only the placeholder changes. The DOM node stays.
    - `key` is only allowed inside `map`.

282. What is wrong with `tax` here?

    ```jsx
    function App() {
      const [price, setPrice] = useState(10);
      const [tax, setTax] = useState(0);

      useEffect(() => {
        setTax(price * 2);
      }, [price]);

      return <p>Tax: {tax}</p>;
    }
    ```

    - The component crashes because `useEffect` cannot set state.
    - `tax` stays one step behind `price` because `setTax` is async.
    - The dependency array is missing `tax`, so this loops forever.
    - `tax` is derived from `price`, so keeping it in state is unnecessary.

283. In React 19, what happens to text typed into `Form` when `mode` goes from `"visible"` to `"hidden"` and back?

    ```jsx
    function Form() {
      const [text, setText] = useState("");

      return (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something"
        />
      );
    }

    function App() {
      const [mode, setMode] = useState("visible");

      return (
        <>
          <button
            onClick={() =>
              setMode((m) => (m === "visible" ? "hidden" : "visible"))
            }
          >
            Toggle
          </button>
          <Activity mode={mode}>
            <Form />
          </Activity>
        </>
      );
    }
    ```

    - The component stays mounted in the background and keeps `text`.
    - The component unmounts and `text` resets to `""`.
    - React throws because a component cannot render while hidden.
    - `text` is saved, but the input DOM node is deleted and recreated.

284. This runs without a thrown error, but the header never shows. What is wrong?

    ```jsx
    import header from "./Header";

    function App() {
      return (
        <div>
          <header />
        </div>
      );
    }
    ```

    - The import needs curly braces.
    - React components must start with a capital letter.
    - The component must be wrapped in a fragment inside the `div`.
    - `header` is a reserved word.

285. The modal flashes at the top, then jumps to the center. What is the best fix?

    ```jsx
    function Modal() {
      const ref = useRef(null);
      const [top, setTop] = useState(0);

      useEffect(() => {
        if (!ref.current) return;

        const height = ref.current.getBoundingClientRect().height;
        setTop(window.innerHeight / 2 - height / 2);
      }, []);

      return (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Centered Modal
        </div>
      );
    }
    ```

    - Nothing is wrong. The jump is expected.
    - Add more dependencies to `useEffect`.
    - Measure in `useLayoutEffect` instead of `useEffect`.
    - Delay the measurement with `setTimeout`.

286. What are `map`, `filter`, and `reduce`? Write a polyfill for `reduce`.

287. What are callbacks, promises, and `async` / `await`?

288. What is debouncing? Write `debounce`.

289. Flatten `[1, [2, 3, [4, 5], 6]]` to `[1, 2, 3, 4, 5, 6]`.

290. Write a curried version of a function.

291. How does JavaScript work under the hood?

292. How do you retry a fetch?

293. Write a function that waits 10 seconds using a Promise.

294. Deep-clone an object. Handle objects, arrays, `null`, and `undefined`.

295. Turn a nested object into a flat dictionary of keys and values.

296. How does inheritance work in JavaScript, and how do you write it in ES5?

297. Schedule a graph of async tasks. A task starts only after its prerequisites finish, and at most `N` tasks run at once.

298. Write `mapLimit(inputs, limit, iteratee, callback)`. Map inputs with an async function, never run more than `limit` at once, keep output order, and start the next task as soon as one finishes.

299. Build a search box that waits before calling the API, and cancel an in-flight request so an old response cannot overwrite a newer one.

300. Find and fix a bug caused by async state updates.

301. Build a restaurant list. Filter by category, rating, and price. Search as the user types. Infinite-scroll a large set. Keep the components split up, rendering cheap, and handle a failed request.

302. Walk through a performance project. How did you find the bottleneck, how did you measure the improvement, and what did you trade away?

303. How do closures, hoisting, and execution context work?

304. How do equality and type coercion work?

305. Write a helper that runs several async operations.

306. Implement the core array transforms.

307. Build reusable form state. Cover validation, errors, and submit.

308. Design a URL shortener like bit.ly.

309. You create 10,000 new short URLs a second. One of them goes viral and gets 100,000 clicks a second. What happens to the system?

310. A news site scheduled a short URL for a newsletter of 10 million people tomorrow, but the target URL has a typo. They need to change it. How do you handle that?

311. You have 1 billion short URLs. An advertiser wants to know which of their 10,000 short URLs is clicked the most. How do you answer?

312. If you had to choose between serving stale data and being down, which do you pick, and why?

313. Flatten a nested array so the top-level items come out first and the nested items come later.

314. What happens when `print` is called?

    ```js

    var obj = {
      value: 6,
      print: function () {
        console.log(this.value);
      },
    };
    ```

315. How do you keep `this` pointing at `obj` if you call `print` later?

316. Write a polyfill for `bind`.

317. Implement a small state subscription system, like a pub-sub or a basic select/dispatch store.

318. Explain every CSS `position` value: static, relative, absolute, fixed, sticky.

319. How do you give flex items different widths?

320. Design a reusable component such as tabs or an accordion. Cover structure, props, state, and reuse.

321. You are given objects that point at each other in a hierarchy. Build that structure and walk it efficiently.

322. In two hours, build one of these: a mail client like Outlook, a chat like Teams, or a notification system like Teams.

323. On the code you just wrote: why that approach, what else could you have done, what did you trade, and what would you change with more time?

324. Implement `Promise`.

325. Memoize a function that returns a promise. The cache has a fixed size, drops the least recently used entry, expires entries, and clears itself.

326. Design a chess board. If you do not know chess, design Snake and Ladder. Can the design grow to several players, custom boards, computer players, and saved games?

327. Write `getRepeated`. `"hellooooloo"` returns `[(2, 3), (4, 7), (9, 10)]` (runs of the same character, as start and end indexes).

328. `{ hellolo: true }` is the dictionary. `canBeFormed("hellooooloo")` is `true`. Shrink runs of the same character and see whether some result is in the dictionary.

329. What are LCP, FID, and CLS?

330. How does a browser turn HTML and CSS into pixels?

331. Insert spaces using a dictionary. `spaceSeparator("helloworld")` is `"hello world"`. `spaceSeparator("helloworldhi")` is `"hello world hi"`. `spaceSeparator("helloworldh")` is `""`. The dictionary has `hi`, `hello`, and `world`.

332. Millions of tweets arrive every second. Alert when one word shows up a billion times inside any moving one-hour window.

333. What do `data(0)` and `data(5)` return?

    ```js

    const data = (x) => x * 2 || 100;
    ```

334. What does frames per second mean in a UI, and why does smooth rendering matter?

335. Why are `transform` and `opacity` cheaper to animate than properties that cause layout or paint?

336. Design "send message" in a chat. Cover tagging people, the components, how the client talks to the server, and where state lives.

337. What is canvas, and when is it faster than drawing with the DOM?

338. Why use semantic HTML instead of only `div`s?

339. When do you use Flexbox, and when do you use Grid? Build a layout with Grid.

340. How do media queries and relative units make a layout work on many screens?

341. What is the critical rendering path, how is the CSSOM built, and how does the event loop fit in?

342. What are `forwardRef` and `useImperativeHandle`?

343. Design the data for a chat app. How do you avoid prop drilling? When is client rendering the right choice?

344. What resource hints do you use, and how do you make interactions feel faster?

345. Design a maps app. Cover canvas versus the DOM, map tiles, what you draw at each zoom, debounce and throttle while panning, state for the map, layers, and UI, tile and geocoding and routing and traffic services, web workers, keyboard, touch, screen readers, and errors.

346. Design WhatsApp on the web. Cover live messages, sync, state, several sessions, and scale.

347. Tell about a production bug you shipped. What was the cause, and what did you change so it would not happen again?

348. How do you work with a difficult stakeholder when the pressure is high?

349. Longest substring without repeating characters.

    ```

    Input: "aaa"
    Output: 1

    Input: "abcdefabcbb"
    Output: 6
    ```

350. A tree has `N` nodes numbered 1 to `N`. Node `i` has weight `Ai`. Find the maximum path sum between any two nodes. `1 <= T <= 10`, `1 <= N <= 1e4`, `-1e6 <= Ai <= 1e6`.

351. Reverse the vowels inside each word of a string.

    ```

    Input: "helloworld"
    Output: "hollowerld"

    Input: "programming"
    Output: "prigrammong"
    ```

352. Build a React app that searches a string against a list of cities and highlights the matching text as you type.

353. Design Netflix, leaving out video playback. Cover the UI structure, sign-in, performance, and write pseudocode for debounce.

354. You get a list of functions that each return an async job. Run them all at once. Then run them one after another. Then run them one after another without `async` / `await`.

355. Walk a referral tree and add up values through it.

356. Explain memoization, debounce, throttle, and `this`. Implement the async helpers they asked for. Also cover closures, prototypes, and execution context.

357. How do you center an element? Cover Flexbox, the box model, and CSS specificity.

358. Design a multiplayer game. Name features and interactions, then split them into must-have, next, and later.

359. Talk about a hard project, mentoring someone, and a conflict you handled.

360. Cover web security, frontend performance, adding a payment flow safely, and using a third-party SDK.

361. What are TCP and UDP, and when do you use each?

362. What do the main HTTP status codes mean?

363. An employee works 7 days. The employer has a gold rod of 7 equal units and must pay 1 unit per day. You may cut the rod at most twice. How do you pay each day?

364. What kinds of constructors are there?

365. What is a virtual function?

366. Which data structure do you like most, and why?

367. Explain the SQL joins.

368. Write breadth-first search.

369. Reverse each word in a string. `"Hello World"` becomes `"olleH dlroW"`.

370. Design tic-tac-toe. Cover the board, turns, a win, a draw, and an N by N board.

371. Write a SQL query for the kth smallest salary.

372. How would you scale a project you have already built?

373. Two classes in a JAR have the same name. What happens when you use that class?

374. You already took an uneven piece of cake. A friend shows up. How do you split what is left so it is fair?

375. Tell me something that is not on your resume.

376. The team wrote 100,000 lines. The client reports a serious bug. Everyone else is on leave. What do you do?

377. How does a hash map work?

378. How does a React component's lifecycle work, and how do you cut extra renders?

379. Two coding problems on arrays, strings, and objects.

380. You get a stock app in CodePen. Speed it up, add and remove a stock from a watchlist, and add search.

381. Walk through a project you built. When do you render on the client, and when on the server? What do Webpack and React do under the hood, and what trade-offs did you make?

382. How do you test a feature after you build it, and why do unit tests matter?

383. Build a React viewer for nested JSON that you can edit.

384. Build a file explorer. Tell files from folders, nest folders with recursion, add a file into a folder, and turn a file into a folder on double-click.

385. Implement an `EventEmitter` in JavaScript.

386. Draw a box. Show a circle that follows the mouse inside the box. Then show the circle only on click. Then speed the tracking up with `useRef`.

387. What happens when you start promises inside a loop? Cover timing, how you would speed it up, and the edge cases.

388. Debug a React issue, then design a social feed on the client. Fake the server with promises. Cover infinite scroll, likes, nested comments, and how you would speed it up.

389. How do you build a product from scratch? Cover components, how data moves, patterns, performance, CI/CD, a slow network, and CSS animation that stays smooth.

390. What would you ask before building an autosuggest box? Split the answers into what it must do and how well it must do it.

391. Build a React component that loads data from an API, shows it, handles loading and errors, and paginates.

392. Explain the event loop, hoisting, the scope chain, closures, and `var` versus `let` versus `const`.

393. Prototypes versus classes. How does memory work, and how do async APIs meet the execution flow?

394. Flatten a deeply nested object.

395. How is `async` / `await` different from promises? Write a helper that runs several async jobs.

396. Lifecycle methods versus hooks. How do you memoize, and how do you stop extra renders?

397. Check a structured input with a stack. Cover the edge cases.

398. Walk through a project, including a dashboard you made load faster, a fight across teams, a hard refactor, and a call you made under pressure.

399. Design and code an ATM. Cover the machine, the account, the card, a transaction, and the cash drawer. Check the PIN, show the balance, and withdraw cash. Handle a low balance, an empty machine, a bad PIN, a blocked card, a rollback, a duplicate charge, and two people using it at once. How would you add a new kind of transaction?

400. Build a dropdown you can reuse, with search. It has to stay fast on a long list. Cover debounce and only drawing the rows on screen.

401. Walk through a hard project and the trade-offs. Then explain service workers, CORS, the critical rendering path, REST, HTTP caching, and how you load scripts. Write a hook that knows if the component is still mounted, and explain the React hooks you use.

402. Walk through a project. Cover the architecture, where state lives, performance, how it would scale, and what was hard.

403. Explain the event loop, async work, execution order, promises, and microtasks versus macrotasks.

404. Build a dropdown. Cover how you split it, reuse, accessibility, keyboard, state, edge cases, and speed. Include ARIA, focus, and screen readers. Controlled versus uncontrolled, open and close, a click outside, and keeping state in sync. Extra renders, memoization, and cleaning up listeners.

405. Why are you leaving if your career there is going well?

406. Is money the only reason for the move?

407. What would you gain here besides money?

408. How would this job help you grow as an engineer?

409. In plain HTML, CSS, and JavaScript, build infinite scroll and a list of 10,000+ items that only draws what is on screen. Compare `IntersectionObserver` with measuring scroll position. What is the cost of 10,000 real nodes versus a virtual list? How do you keep the scroll position steady as items load, and what happens on a fast scroll or a window resize?

410. Design a toast as an npm package. Cover strict types, the public API, how another app installs it, peer dependencies, tree-shaking, bundle size, re-renders, animation, the queue, folders, and unit tests. Can you expose it without a provider? How do several toasts queue or stack? How do you theme it without a fat bundle, render custom content, survive server rendering, and support screen readers and the keyboard?

411. Take a number `n` and draw an `n` by `n` grid. Cells start empty. Click an empty cell and it becomes one more than the highest number already on the grid. Click a filled cell and it becomes that highest number.

    ```

    _ _ _
    _ _ _
    _ _ _

    click the first cell

    1 _ _
    _ _ _
    _ _ _

    click another empty cell

    1 2 _
    _ _ _
    _ _ _

    click the first cell again

    2 2 _
    _ _ _
    _ _ _
    ```

    While you build it, avoid extra renders, compute the max cheaply, and decide what is stored versus derived.

412. How does JavaScript run code? Cover the call stack, the callback queue, and the event loop. Why does `Promise.resolve().then(...)` run before `setTimeout(...)`?

413. What does the browser do when it hits a script tag? What is the difference between `async` and `defer`, and how does each affect painting?

414. Where do you debounce, and where do you throttle? Cover search, infinite scroll, resize, and cutting API calls.

415. Which browser APIs are sync, which are async, and what blocks the thread?

416. What happens after an API call, from the browser's point of view?

417. Design a site where admins write and publish articles stored as Markdown, and readers browse, search, and read them. Cover who can do what, how you render Markdown safely, client versus server rendering, whether a CDN helps, how search engines find posts, infinite scroll versus pages, caching, and a rough guess of daily posts, file size, and concurrent readers.

418. What is the difference between `||` and `??`?

419. What was your most useful work, what do you do when you are stuck, and what do you want from a new team?

420. A pattern `"abcd"` and a string `"axxxbbxxxccxd"`. Do the pattern's characters show up in the string in that order, with other characters allowed in between?

421. Given a number, return the next palindrome that is strictly larger. Watch `999` and `12921`.

422. Write `calc` so `calc(8).sum(3).mul(3).val()` is `33`.

423. Split an array into two parts so the absolute difference of their sums is as small as possible, and return both parts. `[2, 3, 4, 1]` can split into `[2, 3]` and `[4, 1]`. What if the array is huge? What if values can be negative? What do you trade between time and memory?

424. In plain JavaScript and CSS, build an `n` by `n` memory grid. Random cells light up in an order. The player then has 10 seconds to click those cells in that order. Show green for a right click and red for a wrong one. Animate the click order at the end.

425. Write an async recursive walk that finds every file whose name matches a regex.

426. When does React render, where should state live, when do you lift it, and when do you keep it next to the component that uses it? Then walk through a project you built.

427. A circular route of gas stations. Find the starting index where you can complete the loop.

428. Build a GitHub pull-request page in React: search, the list, status pills, and comments. Before coding, say how the data is shaped, how you fetch it, how you split components, and where state lives.

429. Given an HTML node, delete every sibling and leave the node itself. What if it has no parent, or no siblings?

430. If you built that pull-request page again, what would you change, and why?

431. What is reconciliation in React?

432. Why are keys important in React lists?

433. When should `useEffect` not be used?

434. When can `useMemo` hurt performance?

435. Explain `React.memo`.

436. Why does this child still re-render?

    ```jsx

    const Child = React.memo(({ onClick }) => {
      return <button onClick={onClick}>Click</button>;
    });
    ```

437. Explain controlled versus uncontrolled components.

438. What is prop drilling?

439. What is server state?

440. Explain optimistic UI updates.

441. How would you render 50,000 rows?

442. What is the difference between debounce and throttle?

443. What is a closure?

444. What does this print?

    ```js

    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 100);
    }
    ```

445. Explain shallow comparison.

446. Why is immutability important in React?

447. Explain SSR versus CSR versus SSG.

448. What are error boundaries?

449. What is code splitting?

450. What should not be unit tested?

451. Why prefer React Testing Library over Enzyme?

452. How do you test async React components?

453. How would you design a scalable React application?

454. How would you structure a live analytics dashboard?

455. Explain role-based access in a frontend app.

456. What is normalization in state management?

457. How do you modernize a legacy frontend?

458. How do senior frontend engineers think differently?

459. Design a generator of unique random numbers across many servers. How do you guarantee uniqueness, what happens if a server dies, and how do you add more servers?

460. What happens, step by step, when you open a URL?

461. Stop calling an API after 3 failures in a row.

462. Write one function that throttles calls and also fires a last call after the user stops.

463. Design a patient-monitoring dashboard over websockets. It needs live updates, thousands of devices, low latency, and staying up. Cover reconnects, heartbeats, backpressure, message order, and more servers.

464. Write a React hook that fetches data and is safe to reuse.

465. How would you keep a dashboard usable with millions of records?

466. What does this interval log, and why?

    ```jsx

    function Counter() {
      const [count, setCount] = React.useState(0);

      React.useEffect(() => {
        const id = setInterval(() => {
          console.log(count);
        }, 1000);

        return () => clearInterval(id);
      }, []);
    }
    ```

467. What happens when you put an index on a random UUID column?

468. How do you paginate through 50 million rows without `OFFSET`?

469. When would you use a composite index instead of two separate indexes?

470. What is the N+1 query problem, and how do you fix it?

471. How do you prevent double-booking a ticket in a distributed system?

472. What is the difference between repeatable read and serializable isolation?

473. How do you implement a distributed lock without a single point of failure?

474. How do you make a payment retry endpoint idempotent?

475. What causes a cache stampede, and how do you prevent it?

476. If you cache a user profile, how do you invalidate it when they change their email?

477. Why might Redis in front of your database make the system slower?

478. What eviction policy fits a session store, and what fits a content feed?

479. How do you change a live API payload without breaking old mobile clients?

480. What is the difference between a sliding-window log and a fixed-window counter for rate limiting?

481. How do you design an endpoint that uploads a 5 GB video?

482. How do you handle a long task inside a synchronous API request?

483. When would you choose RabbitMQ, and when Kafka?

484. What happens if a Kafka consumer reads a message but fails to commit the offset?

485. How do you handle poison messages that keep crashing workers?

486. How do you process messages in the exact order they were sent?

487. Walk through a project, then explain the event loop, async work, execution order, and promises.

488. Build a dropdown you can reuse. Cover design, edge cases, accessibility, state, performance, and how it would grow.

489. What is TypeScript, and why do we need it?

490. What is the difference between `any` and `unknown`?

491. What are union and intersection types?

492. What does `never` mean?

493. What is the difference between optional, required, and `readonly` properties?

494. When should you let TypeScript infer a type, and when should you write it?

495. Why use a generic instead of `any`?

496. What are `keyof` and `typeof`?

497. Why is TypeScript not runtime safety?

498. Write a typed function that takes a number and returns its square.

499. Type a function that accepts a string or a number and returns its length.

500. Type a user with `id`, `name`, and an optional `email`.

501. Type an array of users.

502. Type a function that returns nothing.

503. Write a generic function that returns the same value it receives.

504. Type the props of a button: label, click handler, and an optional disabled flag.

505. Type an input's change event in React.

506. Write a function that only accepts keys of an object.

507. What is wrong here?

    ```ts

    let value: unknown;
    console.log(value.toUpperCase());
    ```

508. Build a crypto portfolio tracker in React Native. The starter is a `FlatList` of coins with `name`, `symbol`, `price`, and `holdings`. Example rows: Bitcoin at 105000 with 0.5 held, Ethereum at 3500 with 10 held.

    Show each coin's name, symbol, price, holdings, and total value. Add up the portfolio. Format money with commas. Stay smooth when the data changes, including 1000+ assets.

509. Fake a websocket every 2 seconds. Flash a row green when its price goes up and red when it goes down, and only that row. Avoid extra renders. Show the portfolio's gain or loss as a percent. If updates arrive too fast, show a warning toast and batch them.

510. Add search, sort by highest value, highest gain, or name, pull to refresh, save the portfolio on the device, and show an error with a retry when the API fails.

511. A production query joins 10 tables and takes more than 30 seconds. How do you find the cause and speed it up, step by step?

512. How do you measure hallucination rate in production?

513. What retrieval strategy did you test for your RAG system?

514. How did you measure whether a prompt change helped?

515. What did each user request cost in tokens?

516. Build a prototype of an "AI Document Vault".

    - A vault UI with a file and folder explorer.

    - Upload one or more documents, including drag and drop.
    - Show the selected document, plus an AI summary and a cleaned-up markdown version.
    - A small backend that accepts uploads, stores the files (local disk is enough), and stores the summary and markdown next to each file.
    - On upload, call an LLM to write a short summary and a markdown cleanup. The original, the summary, and the markdown must stay linked.

517. Explain JavaScript fundamentals, ES6, closures, scope, events, and browser APIs.

518. Explain semantic HTML, accessibility, forms, and HTML habits that hold up.

519. Explain Flexbox, Grid, positioning, responsive layout, and CSS specificity.

520. Sort an array that contains only `0`, `1`, and `2`, in linear time.

521. A matrix of `0`s and `1`s, a start, and a destination. Can you reach the destination?

522. Longest substring with all unique characters. `abcabcbb` has length `3`.

523. Why do you want this job, and why are you leaving your current one?

524. When do you use a `Map`, and when a plain object? When do you copy with spread, and when with `Object.assign`?

525. Split an array into two parts whose sums are equal.

526. Longest increasing subsequence. Then make it faster than `O(n²)`.

527. A sorted array has exactly one value that appears more than 25% of the time. Find it.

528. Reverse a linked list between two positions, in one pass.

529. Walk through a project. Cover the architecture, where state lives, how it would scale, and what you owned. Then components, extra renders, state patterns, React Native rendering, memoization, performance, APIs, and a large UI.

530. Design a trading app like Zerodha or Groww. Cover a watchlist, stock search, market orders, and live prices. Then websockets, keeping state in sync, cache, rendering, how APIs are called, how components talk, and errors.

531. Design the rules for picking a fantasy team. The user has limited credits, can pick only X players, must meet role limits (at least some bowlers, at most some wicket-keepers), and can take at most Y players from one real team. Where do you store the picks, the credits left, and the derived checks? How do you block a bad team, show the error, update as they tap, and survive new contests, new rules, new formats, and a long player list?

532. Talk about something you owned, a decision you made, and how you work with other people.

533. Which of the given HTML snippets is styled by `p ~ ul { background-color: red; }`?

534. Build a color picker. Show the colors, select one, and make the selection visible.

535. JavaScript output questions on hoisting, scope, closures, and the execution context. Explain the order, not only the result.

536. A basic Node middleware question about how a request moves, how middleware chains, and who writes the response.

537. Design a custom structure that behaves like a queue, with extra constraints and edge cases. Pick the structure, the complexity, the state changes, and the edges.

538. Pick one item at random when each item has a weight. Talk about the distribution, a fast lookup, and how it scales.

539. Walk through a recent frontend project. What would you redesign, what was slow, and what would you change today?

540. Tell about a hard project, a disagreement with a teammate, and a tradeoff you had to make.

541. How would you handle a production incident, stakeholders who disagree on priority, and technical debt with a tight deadline?

542. A variation of climbing stairs.

543. Tell me about your frontend experience.

544. How big is your team?

545. Have you ever designed an application from scratch?

546. What excites you about this role?

547. Build a button that scales on hover, efficiently.

548. What does your AI-assisted workflow look like beyond basic prompting?

549. How do you keep code quality high when using AI?

550. How do you test AI-generated code?

551. How do you keep token spend low when working with AI coding agents?

552. What makes a good design system?

553. Explain the CSS box model.

554. How does CSS specificity work?

555. What are the core principles of responsive design?

556. How would you debug a slow React app?

557. What is the difference between an object and a `Map`?

558. What is the difference between `Map` and `WeakMap`, and how does garbage collection fit in?

559. How would you scale a frontend application from 1,000 to 100,000 daily users?

560. What protocol would you use to integrate an LLM-powered chatbot into a frontend application?

561. Reverse `"abc"` to `"cba"`.

562. Is a string a palindrome? `level`, `racecar`, and `abba` are.

563. Can you delete at most one character and get a palindrome? `"aba"` is already one, `"abca"` becomes one, `"abc"` does not.

564. How can you create a deep copy of an object in JavaScript?

    - `Object.create(obj)`

    - `JSON.parse(JSON.stringify(obj))`
    - `Array.from(obj)`
    - `Object.assign({}, obj)`

565. What does this print?

    ```js
    let x = 10;

    (function () {
      console.log(x);
      let x = 20;
      console.log(x);
    })();
    ```

    - `10` and `undefined`
    - `10` and `20`
    - `undefined` and `20`
    - `ReferenceError`

566. What does this print?

    ```js
    function delay() {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async function test() {
      console.log(1);
      await delay();
      console.log(2);
    }

    test();
    console.log(3);
    ```

    - `1 3 2`
    - `1 2`, with a 1-second delay before `2`
    - `1 2 3`
    - `3 1 2`

567. What does this print?

    ```js
    const person1 = {
      firstName: "Ginny",
      getName: function () {
        return this.firstName;
      },
    };

    const person2 = {
      firstName: "Jhonny",
      getName: () => {
        return this.firstName;
      },
    };

    const getName1 = person1.getName;
    const getName2 = person2.getName;

    console.log(person1.getName(), getName1(), person2.getName(), getName2());
    ```

    - `Ginny`, `undefined`, `undefined`, `undefined`
    - `undefined`, `undefined`, `undefined`, `undefined`
    - `Ginny`, `undefined`, `Jhonny`, `Jhonny`
    - `Ginny`, `Ginny`, `Jhonny`, `Jhonny`

568. Which `Array.prototype` methods return a new array every time?

    - `map`, `filter`, `slice`
    - `map`, `filter`, `sort`, `slice`, `splice`
    - `map`, `filter`, `sort`
    - `map`, `filter`, `sort`, `slice`

569. What do `(4.98234).toFixed(1)` and `(4.1345).toFixed(1)` return?

    - `"5.0"`, `"4.1"`
    - `"4.9"`, `"4.1"`
    - `"5"`, `"4"`
    - `"5.0"`, `"4.2"`

570. `MatrixChallenge(strArr)` reads an `N × N` matrix (`N` from 2 to 5). Each string in `strArr` is one row, wrapped in parentheses. A `1` at row `X`, column `Y` means an edge from node `X` to node `Y`. The edge is one-way. Ignore self-edges.

    Return `"transitive"` if, whenever `X → Y` and `Y → Z` exist, `X → Z` also exists. Otherwise return the missing edges in lexicographic order, like `(0,1)-(0,4)-(1,4)`.

    `["(1,1,1)", "(1,0,0)", "(0,1,0)"]` means `0 → 0`, `0 → 1`, `0 → 2`, `1 → 0`, and `2 → 1`. The missing edges are `(1,2)-(2,0)`.

    - `["(1,1,1)","(0,1,1)","(0,1,1)"]` → `transitive`
    - `["(0,1,0,0)","(0,0,1,0)","(0,0,1,1)","(0,0,0,1)"]` → `(0,2)-(0,3)-(1,3)`

571. How would you stop users from copying content on your webpage?

572. How would you protect an image instead of text?

573. Does that stop screenshots?

574. How do sites detect DevTools?

575. Write `groupBy`. Group these users by `team` into `{ Payments: [...], Risk: [...] }`.

    ```js

    const users = [
      { name: "John", team: "Payments" },
      { name: "Alice", team: "Risk" },
      { name: "Bob", team: "Payments" },
    ];
    ```

576. Write a task scheduler class. Add a task, remove a task, run one task, and run every pending task.

577. Build a shopping cart. Add and remove products, change quantities, show the total, disable checkout when the cart is empty, and update the screen as the cart changes.

578. Longest consecutive sequence, in optimal time.

579. Implement an LRU cache. `get` and `put` are both `O(1)`.

580. How would you detect a cycle in a directed graph? The approach is enough.

581. Design a digital wallet. Cover creating a wallet, the balance, transfers, history, payment processing, and failures. Then architecture, how services talk, the database, the API, scale, security, idempotency, cache, and an audit log.

582. Explain the virtual DOM, reconciliation, the render lifecycle, Fiber, memoization, Suspense, code splitting, and lazy loading. Say why React works that way.

583. Build a currency exchange calculator. Pick a source and destination currency, update the amounts as either side changes, reject bad input, and show a loading state while rates load.

584. Talk about a large project, something you owned, mentoring, a disagreement, a technical decision, working across teams, and a process you improved.

585. Given a string, delete exactly one contiguous substring so the rest has all unique characters. Return the longest length you can get.

586. Deep-clone a value. When you meet an array, append its length to the clone and leave the original alone. `{ skills: ["React", "TypeScript"] }` becomes `{ skills: ["React", "TypeScript", 2] }`.

587. How would you center a div without using `display`?

588. What is the difference between `forEach`, `map`, `filter`, and `reduce`?

589. Are two strings anagrams? Do not use `sort` or `join`. Talk about the approach, the complexity, and the edge cases.

590. Which React hooks have you used?

591. When do you use `useCallback`, and when `useMemo`?

592. Why and when do you write a custom hook?

593. What is the difference between `setState` and `useState`?

594. A custom hook has two `useEffect`s, one with `[]` and one with dependencies. When does each run if the component re-renders?

595. How do you pass data from a child to its parent?

596. How was that done before `forwardRef`?

597. What are the ways to pass data between components?

598. What are hydration issues in React, and how do you fix them?

599. Explain dynamic routing in Next.js.

600. Explain Redux architecture and the data flow.

601. Which hooks come with Redux, and how do you read state in a component?

602. Can you have more than one reducer, and can one component read from several of them?

603. What are Redux middlewares, and which ones have you used?

604. Why do we use Webpack or Vite, and when is one better than the other?

605. What are Core Web Vitals, and how do you measure them?

606. Which library do you use for React unit tests, and why? How would you test a button click with React Testing Library and Jest?

607. The coding tasks sit on an existing travel app. There is no browser console.

    Fix sorting for apartment listings. The sort modal offers price, rating, and title. Bugs were planted in the state, the handlers, and the comparators. Keep the chosen sort when the user leaves the page and comes back. Show the Sort button only on the homepage.

608. Finish the accessibility providers that are already in the app. Key `1` toggles high contrast. Key `2` toggles a keyboard-accessibility mode.

609. Walk through a project. Design a component library other teams can extend. Cover the folders, how it scales, reuse, accessibility, state, and the component API.

610. How do you use AI while coding, where do you stop trusting it, and how do you check what it wrote?

611. Longest common substring. `"abcdef"` and `"zabcf"` share `"abc"`, length `3`.

612. Walk through a project. Cover the architecture, performance, state, a hard part, scale, and working with other teams.

613. What is memoization? When do you use `useMemo`, and how is it different from `useCallback`? `React.lazy` versus a dynamic import, why lazy-load, and how you split code.

614. Where do you use Singleton, Factory, Observer, and Module?

615. Explain hooks, `useEffect`, custom hooks, the component lifecycle, state updates, and controlled versus uncontrolled components.

616. Explain closures, hoisting, scope, the execution context, the event loop, async JavaScript, and promise chaining.

617. Implement `Array.prototype.map`.

618. Implement a singleton class.

619. Use a closure for a counter, a private variable, and currying.

620. What does a mix of `setTimeout`, promises, and `async`/`await` print? Explain the order.

621. Implement `debounce` and `once`.

622. Write `retry(fetchData, retries)`. Retry a failed call, stop on the first success, and reject when the retries run out. Do not use `async`/`await`.

623. Build a multi-step progress tracker. Only one step is active. Next completes the current step and leaves it highlighted. The number of steps is not fixed.

624. Build nested comments, like Reddit. Reply, delete, nest without a depth limit, collapse a thread, and highlight the selected comment.

625. `calculator(10).add(5).multiply(2).subtract(8).value()` is `22`.

626. Build pagination. `<Pagination currentPage={6} totalPages={50} />` shows the first page, the last page, the current page, and one neighbor on each side, with ellipses in the gaps. Support the keyboard, and disable buttons that would leave the range.

627. Debug a React app. Look for extra renders, missing effect dependencies, expensive work during render, bad list keys, and timers that are never cleared. Then how you watch production errors, log frontend events, track API failures, measure Core Web Vitals, and debug a bug a user reported.

628. Which of these pseudo-element rules are invalid?

    - `p::first-line { ... }`

    - `h1::first-letter { ... }`
    - `span::last-line { ... }`
    - `.header::after::first-line { ... }`

629. Which of these are valid CSS transforms?

    - `matrix()`
    - `modify()`
    - `skip()`
    - `rotate()`

630. Metadata defines ___ information.

    - color
    - links
    - scripts
    - character set

631. Which of these arrived with HTML5?

    - Drag and drop
    - 2D drawing on a web page
    - Timed media playback
    - New elements such as `<section>`, `<article>`, and `<footer>`

632. Write `enforceTimeLimit(apiFn, timeLimit)`. It returns a function. If `apiFn` finishes in time, resolve with its result. If it runs longer, reject with `"Time Limit Exceeded"`. A 100 ms limit rejects a call that takes 500 ms, and resolves a call that takes 50 ms. Sample: response `20`, execution `300`, limit `800` resolves to `20`. `apiResponse` is 0 to 10000. `executionTime` and `timeLimit` are 1 to 9000.

633. Review this search. What is wrong with the debounce, and would you approve the pull request?

    ```jsx

    function SearchBar() {
      const [searchText, setSearchText] = useState("");
      const [showResults, setShowResults] = useState(false);
      const [searchResults, setSearchResults] = useState([]);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const navigate = useNavigate();
      const debouncedSearchText = useDebounce(searchText, 10);

      const fetchSearchResults = useCallback(async (value) => {
        if (value.length > 0) {
          try {
            const baseURL = generateBaseURL();
            const response = await fetch(
              `${baseURL}/api/apartments/search?location=${value}`,
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSearchResults(data);
          } catch (error) {
            console.error("Error retrieving search results:", error);
          }
        } else {
          setSearchResults([]);
        }
      }, []);

      useEffect(() => {
        fetchSearchResults(debouncedSearchText);
      }, [debouncedSearchText, fetchSearchResults]);

      const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchText(value);
        setShowResults(value.length > 0);
        setIsDropdownOpen(true);
        fetchSearchResults(value);
      };

      const handleApartmentClick = (apartmentId) => {
        navigate(`/apartments/detail/${apartmentId}`);
        setIsDropdownOpen(false);
        setSearchText("");
      };

      const memoizedSearchResults = useMemo(() => {
        return searchResults.length > 0 ? (
          searchResults.map((result) => (
            <p
              key={result._id}
              onClick={() => handleApartmentClick(result._id)}
            >
              {result.address}
            </p>
          ))
        ) : (
          <p className="no-results">No matching results found</p>
        );
      }, [searchResults]);

      return (
        <div className="search-bar">
          <input
            data-testid="search-input"
            type="text"
            className="search-input"
            placeholder="Search for a location"
            value={searchText}
            onChange={handleInputChange}
          />
          <button
            className="search-button"
            onClick={() => fetchSearchResults(searchText)}
          >
            <FaSearch />
          </button>
          {isDropdownOpen && showResults && (
            <div data-testid="search-div" className="results-dropdown">
              {memoizedSearchResults}
            </div>
          )}
        </div>
      );
    }
    ```

    ```js
    function useDebounce(value, delay) {
      const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() => {
        setDebouncedValue(value);
        const handler = setTimeout(() => {
          console.log("Debounce timer expired");
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      }, [value, delay]);

      return debouncedValue;
    }
    ```

634. Build compound tabs in React and TypeScript. State lives in `useTabs`. Arrow keys move between tabs. Enter or Space activates one. Use `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, and `aria-labelledby`. The active tab looks different, the focus ring is visible, and there is no `any`.

    ```tsx
    <Tabs defaultTab="overview">
      <Tabs.List>
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="transactions">Transactions</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel tabId="overview">Overview content here</Tabs.Panel>
      <Tabs.Panel tabId="transactions">Transactions content here</Tabs.Panel>
      <Tabs.Panel tabId="settings">Settings content here</Tabs.Panel>
    </Tabs>
    ```

635. Design a financial dashboard. Live transaction volume refreshes every 5 seconds. A chart shows daily revenue for 30 days and does not need to be live. An error-rate gauge is pushed over a websocket. The first paint should not wait on heavy resources.

636. How would you notify the user, without a refresh, when money arrives, a loan offer appears, or another alert fires?

637. The app has more than 200 hardcoded Tailwind values and the styles do not match. How would you replace them with design tokens?

638. Implement `Fetcher`. `get(id)` returns the object for that id, or throws if it is missing. `post(id, x)` stores `x` under `id`, or throws if `id` already exists. A `DB` class is already there. `read` and `create` each return a promise that resolves in 10 ms. The database starts empty. There are 1 to 500 queries. Type `1` is get, type `2` is post. `id` and `x` are 1 to 1000.

    - `get 1`, `post 1 = 11`, `post 2 = 12`, `get 2` prints `-1` then `12`.

    - `post 1 = 11`, `post 2 = 22`, `get 1` prints `11`.

639. Which of these arrived with HTML5? Pick one or more.

    - Drag and drop
    - 2D drawing on a web page
    - Timed media playback
    - New elements such as `<section>`, `<article>`, and `<footer>`

640. Build a Kanban board. Stages, in order, are Backlog (`0`), To Do (`1`), Ongoing (`2`), and Done (`3`). A task is `{ name, stage }`. `name` is unique. The new-task input starts empty. Create adds that name to Backlog and clears the input. An empty name does nothing. Each stage is a `<ul>` of `<li>`s. Each task has back, forward, and delete. Back and forward are disabled on the first and last stage. Test ids: `create-task-input`, `create-task-button`, `stage-0` through `stage-3`, and for a task named `abc`, `abc-name`, `abc-back`, `abc-forward`, `abc-delete`. Spaces in a name become hyphens in the id. The board starts with tasks `1` and `2`, both in Backlog.

641. What is the minimum number of swaps to sort `[5, 3, 1, 7, 2, 6, 4]` ascending, and descending?

    - `4, 5`

    - `5, 4`
    - `4, 4`
    - `5, 5`

642. Explain the event loop, the call stack, the execution context, promise chaining, `async`/`await`, `async` versus `defer`, debounce versus throttle, memory, and sync versus async browser APIs.

643. What does this print?

    ```js

    console.log(1);
    setTimeout(() => console.log(2));
    Promise.resolve().then(() => console.log(3));
    console.log(4);
    ```

644. Design a site where admins publish Markdown and readers read it, and it has to scale. Cover why Markdown, where the files and metadata live, how pages render, a CDN, SQL versus NoSQL, SEO, who can publish, caching, and a rough estimate of readers, articles per day, file size, and storage.

645. Given an integer `n`, subtract the sum of its odd digits from the sum of its even digits. `412` is `5`. `1203` is `-2`.

646. An image is a matrix of integers. Replace each cell with the average of the cells that share a corner with it. Do not include the cell itself. `[[1, 4], [7, 10]]` becomes `[[7, 6], [5, 4]]`.

647. One alphabet is a rearrangement of another. Can one string be turned into the other by a substitution cipher? `"aacb"` and `"aabc"` can. `"aa"` and `"bc"` cannot.

648. Walk through a project. Compare client rendering, server rendering, and streaming. How do you animate and style an accordion? How do you speed a page up, and how did you measure it?

649. Run a list of promises one after another.

650. Design a tree of files and folders. Lookups should be as close to constant time as you can get. Then print the tree.

651. Given a list of promises, settle with the earliest index that resolves, not merely whichever promise finishes first.

652. Walk through a past project and a decision you made.

653. When would you pick React, and when Next.js?

654. What is the difference between `forEach` and `map`, and which do you use on a large list?

655. Fetch records into a table. Add search, column sorting, pagination, a loading state, and an empty state.

656. Rebuild a dashboard from a screenshot. Match the layout, type, spacing, and how it behaves on a small screen.

657. Walk through a project. What did you build, what was hard, what did you speed up, and what did you decide?

658. Design autocomplete. Debounce the requests, move with the keyboard, highlight the match, show loading, an empty state, and errors, cancel a stale request, and cache earlier searches. Also virtualize a long list, and expose the right `aria` attributes.

659. What does this do?

    ```js

    function Foo(x) {
      function bar() {
        return x;
      }

      this.baz = function () {
        return x;
      };
    }

    Foo.prototype.baz = function () {
      return x;
    };

    const obj = new Foo(10);
    obj.baz();
    obj.bar();
    ```

    How would you expose `bar` and still keep `x` private?

660. Write a reusable `memoize`.

661. Build "People you may know" with HTML, CSS, and JavaScript. Show user cards. Connect removes a card. See more loads more people from an API and appends them. How would you attach fewer click listeners?

662. Build a tooltip, first with HTML and CSS, then with JavaScript. It sits above the link, the arrow is centered, and it can sit on any side. How do you pick the side, and how do you avoid one tooltip node per target?

663. Maximum subarray sum. Also return the start index and the end index.

664. Implement `String.prototype.repeat` so `"Hi".repeat(3)` is `"HiHiHi"`. Do better than appending one copy at a time.

665. Parse `"(1,2,3),(4,5,6),(7,8,9)"` into `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]`. Then `tuple(str).multiply(2)` is `80`.

666. What does `1 + function x() {}` print? Then override `toString` with an IIFE, a closure, and the revealing module pattern.

667. Design a calculator with unlimited undo, including a jump back to any earlier step. Then turn it into `createCalculator()`, `execute`, `undo`, and `undoTo(4)`.

668. How do you measure frontend performance? Which Core Web Vitals have you improved? How do you work with design? Tell about a change that made the product better.

669. Talk about mentoring, something you owned, a conflict, planning a project, a hard technical decision, and where you want to go.

670. A binary search tree. Do any three nodes sum to zero?

671. A binary matrix is sorted in each row. Which row has the most `1`s? Both dimensions can be huge.

672. Rebuild a UI from a mockup. Use semantic HTML, Flexbox or Grid, and a layout that holds up on a small screen.

673. Walk through a project. Why this role, and not a general software role?

674. Your homepage’s LCP jumped from 2.1s to 4.8s after a release. How do you investigate? What if the frontend did not change? How do you tell if the backend is the cause?

675. Chrome shows multiple forced reflows. How do you debug and fix them? Which APIs force layout? Why doesn’t React do this for you?

676. A React dashboard with 100,000 rows gets slow after live updates. What do you optimize first? Why isn’t pagination enough? When would virtualization not help?

677. Animations drop frames on low-end Android phones. How do you investigate?

678. Scrolling feels laggy only on long pages. How do you debug it?

679. The page loads quickly, but nothing is clickable for 4 seconds. How do you investigate?

680. Lighthouse is excellent locally and Core Web Vitals are poor in production. Why?

681. A third-party analytics script made the page sluggish. What do you do?

682. A React page re-renders often, but the DOM barely changes. Why is it still slow?

683. How do you tell whether a slowdown is JavaScript or browser rendering?

684. Infinite scroll gets slower after every page. Why?

685. A modal opens with a noticeable delay. How do you speed it up?

686. A page has 10,000 DOM nodes. What problems can that cause?

687. Scrolling gets slow after several dropdowns have been opened. How do you debug it?

688. A page is fine on desktop and slow on mobile. What do you look at?

689. How do you reduce layout shift in production?

690. Your CSS file is 2 MB. How do you shrink it?

691. How do you optimize a page with many expensive shadows and blurs?

692. The browser spends more time in “Recalculate Style” than in “Layout.” What does that mean?

693. How do you know an optimization actually helped?

694. When would you use `will-change`?

695. Why measure before you optimize?

696. A dashboard freezes whenever the filters change. How do you investigate?

697. How would you explain browser rendering to a junior developer?

698. What is the biggest mistake frontend engineers make when optimizing rendering?

699. Offscreen sections on a heavy dashboard should stop costing layout and paint until the user scrolls to them. How do you use `content-visibility`, and what do you trade? Is it the same as `display: none`?

700. Why is animating `width` or `top` slower than animating `transform`? Which CSS properties trigger layout? Which ones are GPU-accelerated?

701. What is the difference between reflow and repaint? Can a reflow trigger a repaint? Can a repaint happen without a reflow?

702. Scrolling is janky, and DevTools shows repeated “Recalculate Style” and “Layout.” How do you debug and fix it? What is layout thrashing? What is a long task? How do you cut main-thread work?

703. Burst balloons. What order collects the most coins?

704. You are given each course’s duration and deadline. What is the most courses you can finish?

705. Build a reusable autocomplete. It calls a configurable endpoint, filters with a function you pass in, shows suggestions, and fills the input when one is picked. Then debounce the calls, cancel a stale request, cache repeated queries, and skip the request until the query is long enough.

706. Walk through a project, a decision, a production bug, and a time you were under pressure. How do you use AI, and how do you check what it wrote?

707. What is scope?

708. What is the call stack?

709. What is a callback?

710. What is a promise?

711. What is `async`/`await`?

712. What are object methods?

713. What is a prototype?

714. What is `this`?

715. What does `bind` do?

716. What does `call` do?

717. What does `apply` do?

718. What is a constructor function?

719. What are ES6 classes?

720. What is inheritance?

721. What is `map`?

722. What is `filter`?

723. What is `reduce`?

724. What is `forEach`?

725. What are `some` and `every`?

726. What is `find`?

727. What is `findIndex`?

728. What is `splice`?

729. What is `slice`?

730. What is debouncing?

731. What is throttling?

732. What is currying?

733. What is memoization?

734. What is the difference between a deep copy and a shallow copy?

735. What is the spread operator?

736. What is the rest operator?

737. What is destructuring?

738. What is optional chaining?

739. Show a deep copy.

740. Show a shallow copy.

741. What is the DOM?

742. What is the BOM?

743. What is event bubbling?

744. What is event capturing?

745. What is `localStorage`?

746. What is `sessionStorage`?

747. What are cookies?

748. What is the Fetch API?

749. What is Axios?

750. What are template literals?

751. What are modules?

752. What is a `Set`?

753. What is a `Map`?

754. What is the difference between `Promise.all` and `Promise.allSettled`?

755. What are generators?

756. What is the difference between `null` and `undefined`?

757. What is `NaN`?

758. What is type coercion?

759. What is a memory leak?

760. What does this print?

    ```js

    const user = {
      name: "Gourav",
      getName() {
        return this.name;
      },
    };

    const getName = user.getName;

    console.log(user.getName());
    console.log(getName());
    ```

761. `sum(1)(2)(3)(4)` is `10`.

762. Implement `Array.prototype.reduce`. Cover a missing initial value, an empty array, holes, the callback arguments, mutation, and `this` inside the callback.

763. Call an API and abort it if it runs longer than a given time.

764. Implement inheritance with the prototype chain. Cover `prototype`, `__proto__`, `Object.create`, constructors, `instanceof`, `new`, `call` / `apply` / `bind`, and classes versus prototypes.

765. Build a login form. Email or username, password, validation, submit, a loading state, an error, and a success state. Also structure, state, accessibility, reuse, and edge cases.

766. Walk through a project. How does a feature move from the requirement to monitoring? How do you find a production bug? How have you improved Core Web Vitals, splitting, lazy loading, the bundle, images, cache, memoization, virtualization, extra renders, and the network?

767. A disagreement, a production incident, a hard decision, working with product and design, something you owned, mentoring, a tight deadline, and a mistake you learned from.

768. What is `123['toString'].length + '123'`?

769. How does the JavaScript engine work? What happens when a function is called? What is an execution context? What causes a stack overflow? What is a closure? Where are objects stored? What happens when nothing references a value? How does garbage collection work? Is JavaScript single-threaded? What are Web Workers? What is the difference between microtasks and macrotasks?

770. Implement `Promise.all`. What if the second promise rejects? What if the third resolves before the first? How do you keep the original order? Cover values that are not promises, and an empty array.

771. Design a React higher-order component for role-based access.

772. When would you use Context and `useReducer`, and when Redux or Zustand?

773. When would you use CSS-in-JS, and when Tailwind?

774. Design a real-time monitoring dashboard.

775. Explain the critical rendering path. What causes reflow? What causes repaint? What is compositing? Why can animations get expensive? Why is `transform` often used for animation? What is layout thrashing? How does the cache help? How does code splitting help startup?

776. How would you reduce time to interactive?

777. How do you prevent XSS and CSRF?

778. For a product catalog, which is better, server rendering or incremental static regeneration?

779. Tell me about a time you defended a technology decision.

780. How do you keep code quality high?

781. The backend APIs are late. What do you do?

782. Tell me about mentoring a junior developer.

783. `POST /payments` with `{ "orderId": "ORD-991", "amount": 499 }`.

    The client times out and retries. How do you avoid charging twice?

784. Two requests with the same key arrive at the same time. What happens?

785. The same key is sent with a different amount. What happens?

786. The card is charged, then the service crashes before it saves the success. What happens?

787. What happens after the idempotency record expires?

788. What stops two requests from both seeing that the key is missing?

789. The second request loses the insert race. What does it return?

790. The payment provider charges the card, then the process dies before the record is marked completed. The client retries and the record still says processing. What do you do?

791. The record expires after 24 hours and the client retries at 25 hours. What happens?

792. Two regions both accept writes, and the same retry hits both. Where is uniqueness decided?

793. Does this give you exactly-once processing?

794. Redis stores the key, then the service dies. What happens?

795. The payment succeeds before the database commit. What happens?

796. Can a database transaction roll back the payment provider?

797. Design a stock trading app like Upstox. Show many stocks, live prices, search, portfolio gain and loss, buy and sell, and manage the portfolio. Cover the API shapes, client versus server versus hybrid rendering, polling versus WebSockets versus server-sent events, virtualization, state, cache, pagination, splitting, lazy loading, extra renders, and staying responsive under many users and a live market.

798. Write a `setTimeout` polyfill with the `Promise` constructor.

799. Build a React timer with Start, Pause, and Reset.

800. Build a React counter, write unit tests for it, and write unit tests for a function that calls an API.

801. Walk through previous projects, your role, and a normal day. How does your SDLC and a sprint work? How do code review and merge work? What do you look for in someone else's pull request? Design principles such as SOLID. A few questions on CI/CD.
