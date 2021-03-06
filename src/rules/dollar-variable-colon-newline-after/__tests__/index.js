import rule, { ruleName, messages } from "..";

testRule(rule, {
  ruleName,
  config: ["always"],
  syntax: "scss",

  accept: [
    {
      code: `a {
      $var1:
        100px;
    }`,
      description: "a {$var1:\\n100px;}"
    },
    {
      code: "a { $var1 :\n100px }",
      description: "a { $var1 :\\n100px }"
    },
    {
      code: "a { $var1\n:\n100px }",
      description: "a { $var1\\n:\\n100px }"
    },
    {
      code: "a { $var1\r\n:\r\n100px }",
      description: "a { $var1\\r\\n:\\r\\n100px }"
    },
    {
      code: "a { $var1\n:\n(100px) }",
      description: "always: should allow variable using parens with newline"
    },
    {
      code: "a { $var1\r\n:\r\n(100px) }",
      description: "always: should allow variable using parens with newline"
    },
    {
      code: "a { width: 100px; }",
      description: "a { width: 100px; }"
    },
    {
      code: "$background:\n  url(data:application/font-woff;...);",
      description: "$background:\\n  url(data:application/font-woff;...);"
    },
    {
      code: `
      $map: (
        foo: 1,
        bar: 2,
      );
      `,
      description: "always: should ignore Sass maps"
    },
    {
      code: `
      $var: (
        1 +
        2 +
        3
      );
      `,
      description: "always: should ignore multiline variables"
    }
  ],

  reject: [
    {
      code: "a { $var1 :100px; }",
      description: "a { $var1 :100px; }",
      message: messages.expectedAfter(),
      line: 1,
      column: 11
    },
    {
      code: "a { $var1 :  100px; }",
      description: "a { $var1 :  100px; }",
      message: messages.expectedAfter(),
      line: 1,
      column: 11
    },
    {
      code: "a { $var1 :\\t100px; }",
      description: "a { $var1 :\\t100px; }",
      message: messages.expectedAfter(),
      line: 1,
      column: 11
    },
    {
      code: "a { $var1 : 100px; }",
      description: "a { $var1 : 100px; }",
      message: messages.expectedAfter(),
      line: 1,
      column: 11
    },
    {
      code: "$var1 :100px;",
      description: "$var1 :100px;",
      message: messages.expectedAfter(),
      line: 1,
      column: 7
    },
    {
      code: "$var1 :  100px;",
      description: "$var1 :  100px;",
      message: messages.expectedAfter(),
      line: 1,
      column: 7
    },
    {
      code: "$var1 :\\t100px;",
      description: "$var1 :\\t100px;",
      message: messages.expectedAfter(),
      line: 1,
      column: 7
    },
    {
      code: "$var1 : 100px;",
      description: "$var1 : 100px;",
      message: messages.expectedAfter(),
      line: 1,
      column: 7
    },
    {
      code: "$var1 : (100px);",
      description: "always: should report variable with parens without newline",
      message: messages.expectedAfter(),
      line: 1,
      column: 7
    }
  ]
});

testRule(rule, {
  ruleName,
  config: ["always-multi-line"],

  accept: [
    {
      code: "a {\n" + "  $var1: 100px\n" + "}",
      description: "a {\\n" + "  $var1: 100px\\n" + "}"
    },
    {
      code:
        "  $box-shadow:\n" +
        "    0 0 0 1px #5b9dd9,\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);",
      description:
        "  $box-shadow:\\n" +
        "    0 0 0 1px #5b9dd9,\\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);"
    },
    {
      code: "a { $var1:100px }",
      description: "a { $var1:100px }"
    },
    {
      code: "a { $var1: (100px) }",
      description:
        "always-multi-line: should accept single line variable with parens"
    },
    {
      code: "a { $var1 :\t100px }",
      description: "a { $var1 :\\t100px }"
    },
    {
      code: "a { $var1\n: 100px }",
      description: "a { $var1\\n: 100px }"
    },
    {
      code: "a { $var1\r\n:  100px }",
      description: "a { $var1\\r\\n:  100px }"
    },
    {
      code:
        "  $box-shadow:\n" +
        "    0 0 0 1px #5b9dd9, 0 0 2px 1px rgba(30, 140, 190, 0.8);",
      description:
        "  $box-shadow:0 0 0 1px #5b9dd9,\\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);"
    },
    {
      code:
        "a {\n" +
        "  box-shadow: 0 0 0 1px #5b9dd9,\n 0 0 2px 1px rgb(30, 140, 190); }",
      description:
        "a{\n" +
        "  box-shadow: 0 0 0 1px #5b9dd9,\\n  0 0 2px 1px rgb(30, 140, 190); }"
    },
    {
      code: `
      $map:\n(
        foo: 1,
        bar: 2,
      );
      `,
      description:
        "always-multi-line: should allow Sass map using newline after colon"
    },
    {
      code: `
      $var:\r\n(
        1 +
        2 +
        3
      );
      `,
      description:
        "always-multi-line: should allow multiline variable using newline after colon"
    },
    {
      code: `
      $map: (
        foo: 1,
        bar: 2,
      );
      `,
      description:
        "always-multi-line: should allow using Sass map without a newline"
    },
    {
      code: `
      $var: (
        1 +
        2 +
        3
      );
      `,
      description:
        "always-multi-line: should allow using multiline variable with parens without a newline"
    },
    {
      code: `
      $foo: 1;

      $foo:
        2,
        3;

      $foo: (
        bar: 1,
        qux: 2,
      );
      `,
      description:
        "always-multi-line: should allow using a mix of multiline variables"
    }
  ],

  reject: [
    {
      code:
        "  $box-shadow: 0 0 0 1px #5b9dd9,\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);",
      description:
        "  $box-shadow: 0 0 0 1px #5b9dd9,\\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);",
      message: messages.expectedAfterMultiLine(),
      line: 1,
      column: 14
    },
    {
      code:
        "  $box-shadow:0 0 0 1px #5b9dd9,\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);",
      description:
        "  $box-shadow:0 0 0 1px #5b9dd9,\\n" +
        "    0 0 2px 1px rgba(30, 140, 190, 0.8);",
      message: messages.expectedAfterMultiLine(),
      line: 1,
      column: 14
    }
  ]
});
