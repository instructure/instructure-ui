describe('New TopNavBar', () => {
  describe('SideNavBar', () => {
    it('should change URL on SideNavBar item selection', () => {
      cy.visit('http://localhost:9090/')

      cy.url().should('not.contain', 'studio')
      cy.contains('Studio').should('be.visible')

      cy.contains('Studio')
        .click().wait(100)

      cy.url().should('contain', '/studio')

      cy.contains('Account')
        .click().wait(100)

      cy.url().should('contain', '/account')

      cy.contains('Courses')
        .click().wait(100)
      cy.contains('Course 1')
        .click().wait(100)

      cy.url().should('contain', '/course1')
    })

    it('should trigger onclick callback on SideNavBar item selection', () => {
      cy.visit('http://localhost:9090/')

      cy.on('window:alert', cy.stub().as('alertStub'))
      const expectedAlertText = 'Help clicked'

      cy.contains('Help')
        .click().wait(100)

      cy.get('@alertStub')
        .should('have.been.calledOnceWith', expectedAlertText)
    })

    it('should show main navigation as SideNavBar with labelled items', async () => {
      cy.visit('http://localhost:9090/')
  
      cy.contains('This is home').should('exist')
      cy.get('nav[data-cid="SideNavBar"]').as('SideNavBar').should('exist')
  
      cy.get('@SideNavBar').find('li').should('have.length', 6)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('button', 'Minimize SideNavBar').should('be.visible')
    })

    it('should minimize SideNavBar and show only icons as items', async () => {
      cy.visit('http://localhost:9090/')
  
      cy.contains('This is home').should('exist')
      cy.get('li[class$="-navigation__list"]').should('have.length', 6)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('button', 'Minimize SideNavBar')
        .click().wait(100)
  
      cy.get('li[class$="-navigation__list"]').should('have.length', 6)
  
      cy.contains('Account').should('not.be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
  
      cy.contains('Courses').should('not.be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
  
      cy.contains('Help').should('not.be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
    })

    it('should show main navigation as topNavBar and burger menu in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:9090')
  
      cy.contains('This is home').should('exist')
      cy.get('div[class$="-mobileTopNavTopBar"]').as('TopNav').should('exist')
      cy.get('@TopNav').find('svg[name="IconAnalytics"]').should('be.visible')
      cy.get('@TopNav').find('svg[name="IconAlerts"]').should('be.visible')
      cy.contains('button', 'burger').should('be.visible')
  
      cy.contains('Account').should('not.be.visible')
      cy.get('svg[name="IconUser"]').should('not.be.visible')
      cy.contains('Courses').should('not.be.visible')
      cy.get('svg[name="IconCourses"]').should('not.be.visible')
      cy.contains('Help').should('not.be.visible')
      cy.get('svg[name="IconQuestion"]').should('not.be.visible')
      
      cy.contains('button', 'burger')
        .click().wait(100)
  
      cy.contains('Account').should('be.visible')
      cy.get('svg[name="IconUser"]').should('be.visible')
      cy.contains('Courses').should('be.visible')
      cy.get('svg[name="IconCourses"]').should('be.visible')
      cy.contains('Help').should('be.visible')
      cy.get('svg[name="IconQuestion"]').should('be.visible')
  
      cy.contains('Courses')
        .click().wait(100)
  
      cy.contains('Courses1').should('be.visible')
  
      cy.contains('Back')
        .click().wait(100)
  
      cy.get('Courses1').should('not.exist')
  
      cy.get('svg[name="IconX"]').closest('button')
        .click().wait(100)
  
      cy.contains('Courses').should('not.be.visible')
    })

    it('should close burger menu after item selection in mobile view', async () => {
      cy.viewport(300, 400) 
      cy.visit('http://localhost:9090/')
  
      cy.contains('This is the dashboard').should('not.exist')
      cy.get('ul[class$="-options__list"]').should('not.be.visible')
  
      cy.contains('button', 'burger')
        .click().wait(100)
  
      cy.contains('Dashboard').should('be.visible')
      cy.get('ul[class$="-options__list"]').should('be.visible')
  
      cy.contains('Dashboard')
        .click().wait(100)
  
      cy.contains('This is the dashboard').should('be.visible')
      cy.contains('Dashboard').should('not.be.visible')
      cy.get('ul[class$="-options__list"]').should('not.be.visible')
    })
  })

  describe('Tray', () => {
    it('should open and close SideNav Tray properly', async () => {
      cy.visit('http://localhost:9090/')

      cy.contains('button', 'Courses')
        .click().wait(100)

      cy.contains('Course 1').should('be.visible')
      cy.contains('Course 2').should('be.visible')

      cy.get('svg[name="IconX"]').closest('button')
        .click().wait(100)

      cy.contains('Course 1').should('not.be.visible')
      cy.contains('Course 2').should('not.be.visible')
    })

    it('should close SideNav Tray menu after item selection', async () => {
      cy.visit('http://localhost:9090/')
  
      cy.contains('This is the first course home page').should('not.exist')
      cy.get('span[data-cid="Tray"]').should('not.exist')
      cy.contains('Course 2').should('not.exist')
  
      cy.contains('Courses')
        .click().wait(100)
  
      cy.get('span[data-cid="Tray"]').should('be.visible')
      cy.contains('Course 2').should('be.visible')
  
      cy.contains('Course 1')
        .click().wait(100)
  
      cy.contains('This is the first course home page').should('be.visible')
      cy.get('span[data-cid="Tray"]').should('not.be.visible')
      cy.contains('Course 2').should('not.be.visible')
    })
  })

  describe('LTI', () => {
    it('should display the LTI topNavBar only on specific pages', () => {
      cy.visit('http://localhost:9090/')

      cy.get('div[class$="-desktopTopNavContainer"]')
        .should('not.exist')

      cy.contains('Studio')
        .click().wait(100)

      cy.get('div[class$="-desktopTopNavContainer"]')
        .should('exist')
    })

    it('should show LTI topNavBar menu items', () => {
      cy.visit('http://localhost:9090/studio')

      cy.get('div[class$="-desktopTopNavStart"]').as('menu')
        .should('exist')

      cy.get('@menu')
        .find('li').should('have.length', 4)
    })

    it('should highlight selected LTI topNavBar menu item', () => {
      cy.visit('http://localhost:9090/studio')

      cy.get('div[class$="-desktopTopNavStart"]')
        .find('li').eq(0).as('firstMenuItem')

      cy.get('@firstMenuItem').find('button')
        .should('have.attr', 'aria-current', 'page')

      cy.get('@firstMenuItem').find('div[class$="-topNavBarItem__container"]')
        .then(($container) => {
          cy.window().then((win) => {
            const afterStyles = win.getComputedStyle($container[0], '::after')

            expect(parseFloat(afterStyles.getPropertyValue('height'))).to.be.greaterThan(0)
          })
        })

      cy.get('div[class$="-desktopTopNavStart"]')
        .find('li').eq(1).as('secondMenuItem')

      cy.get('@secondMenuItem')
        .find('button').should('not.have.attr', 'aria-current')
    })

    it('should highlight focused LTI topNavBar menu item', () => {
      cy.visit('http://localhost:9090/studio')

      cy.contains('Settings').closest('button').as('button')

      cy.get('@button').focus()
        .then(($button) => {
          cy.window().then((win) => {
            const beforeStyles = win.getComputedStyle($button[0], '::before')
            const border = beforeStyles.getPropertyValue('border')
      
            expect(border).to.contains('2px solid')
          })
        })
    })

    it('should show LTI topNavBar SubMenu as menuitem', () => {
      cy.visit('http://localhost:9090/studio')

      cy.get('div[class$="-desktopTopNavStart"]')
        .find('li').eq(3).as('subMenu')

      cy.get('@subMenu').click().wait(100)

      cy.contains('Link One').should('be.visible')

      cy.contains('Link One').click().wait(100)

      cy.contains('Level 2 Option One').should('be.visible')
      cy.get('Link One').should('not.exist')

      cy.contains('Back').click().wait(100)

      cy.contains('Link One').should('be.visible')

      cy.contains('Link Two').click().wait(100)

      cy.url().should('contain', '/#TopNavBar')
      cy.get('Link Two').should('not.exist')
    })

    it('should show LTI topNavBar buttons', () => {
      cy.visit('http://localhost:9090/studio')

      cy.get('div[class$="-desktopTopNavEnd"]')
        .find('button').should('have.length', 2)

      cy.get('div[class$="-desktopTopNavEnd"]')
        .find('button').eq(0).as('AddLineButton')

      cy.get('@AddLineButton')
        .should('have.text', 'AddLine')

      cy.get('@AddLineButton').find('svg[name="IconAdd"]')
        .should('exist')
    })

    it('should trigger onclick callback on LTI topNavBar button click', () => {
      cy.visit('http://localhost:9090/studio')

      cy.on('window:alert', cy.stub().as('alertStub'))

      cy.contains('AddLine')
        .click().wait(100)

      cy.get('@alertStub')
        .should('have.been.calledWith', 'Button 1')

        cy.contains('AdminLine')
        .click().wait(100)

      cy.get('@alertStub')
        .should('have.been.calledWith', 'Button 2')
    })

    it('should not show LTI topNavBar menu items and buttons in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:9090/studio')

      cy.wait(100)
      cy.contains('LTI VIEW TEST').should('exist')

      cy.get('AddLine').should('not.exist')
      cy.get('svg[name="IconAdd"]').should('not.exist')

      cy.get('div[class$="-topNavBarMenuItems"]').should('not.exist')
      cy.get('Settings').should('not.exist')
      cy.get('Submenu').should('not.exist')
    })

    it('should close LTI TopNav SubMenu after item selection', async () => {
      cy.visit('http://localhost:9090/studio')
  
      cy.contains('LTI VIEW TEST').should('be.visible')
      cy.get('ul[class$="-options__list"]').should('not.exist')
  
      cy.contains('Submenu')
        .click().wait(100)
  
      cy.get('ul[class$="-options__list"]').should('be.visible')
      cy.contains('Link One').should('be.visible')
  
      cy.contains('Link Two')
        .click().wait(100)
  
      cy.get('ul[class$="-options__list"]').should('not.exist')
      cy.contains('Link One').should('not.exist')
    })
  })

  describe('SubNav', () => {
    it('should show subNav on specific page', () => {
      cy.visit('http://localhost:9090/')

      cy.contains('This is home').should('exist')
      cy.get('div[class$="-subNavContainer"]').should('not.exist')
      cy.contains('Announcements').should('not.exist')

      cy.contains('Courses').click().wait(100)
      cy.contains('Course 1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('div[class$="-subNavContainer"]').should('exist')
      cy.contains('Announcements').should('be.visible')
    })

    it('should show subNav in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:9090/')

      cy.contains('This is home').should('exist')
      cy.get('div[class$="-subNavContainer"]').should('not.exist')
      cy.contains('Announcements').should('not.exist')

      cy.contains('button', 'burger').click().wait(100)
      cy.contains('Courses').click().wait(100)
      cy.contains('Courses1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('div[class$="-subNavContainer"]').should('exist')
      cy.contains('Announcements').should('be.visible')
    })
  })

  describe('Breadcrumbs', () => {
    it('should show Breadcrumbs', () => {
      cy.visit('http://localhost:9090/')

      cy.contains('This is home').should('exist')
      cy.get('ol[class$="-breadcrumb"]').should('not.be.visible')
      cy.contains('Crumb 1').should('not.be.visible')
      cy.url().should('not.contain', '#crumb1')

      cy.contains('Courses').click().wait(100)
      cy.contains('Course 1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('ol[class$="-breadcrumb"]').should('be.visible')
      cy.contains('Crumb 1').should('be.visible')

      cy.contains('Crumb 1').click().wait(100)
      cy.url().should('contain', '#crumb1')
    })

    it('should not show Breadcrumbs in mobile view', () => {
      cy.viewport(300, 400)
      cy.visit('http://localhost:9090/')

      cy.contains('This is home').should('exist')
      cy.get('ol[class$="-breadcrumb"]').should('not.exist')
      cy.contains('Crumb 1').should('not.exist')

      cy.contains('button', 'burger').click().wait(100)
      cy.contains('Courses').click().wait(100)
      cy.contains('Courses1').click().wait(100)

      cy.contains('This is the first course home page').should('be.visible')
      cy.get('ol[class$="-breadcrumb"]').should('not.exist')
      cy.contains('Crumb 1').should('not.exist')
    })
  })
})