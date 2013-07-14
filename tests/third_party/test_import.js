describe("Imports tests", function() {

    it("pack value", function() {
        package("buster.st", 25);

        assert.equals(package("buster.st"), 25);
    });

    it("pack object", function() {
        package("buster.st",
            {
                "1": 1,
                "deep": {
                    "2": 2
                }
            });

        assert.equals(package("buster.st"), {
            "1": 1,
            "deep": {
                "2": 2
            }
        });

        assert.equals(package("buster.st.deep"), {"2": 2});
        assert.equals(package("buster.st.deep.2"), 2);
        assert.equals(package("buster.st.1"), 1);
    });

    it("pack generate path", function() {
        package("val.some.path", 1);

        assert.equals(package("val"), {"some": {"path": 1}});
    });

});
